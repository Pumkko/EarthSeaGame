using Azure.Identity;
using Azure.Security.KeyVault.Keys;
using EarthSeaGameApi;
using EarthSeaGameApi.Configs;
using EarthSeaGameApi.Hubs;
using EarthSeaGameApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var keyVaultConfigSection = builder.Configuration.GetSection(KeyVaultConfig.ConfigKey);
var authConfigSection = builder.Configuration.GetSection(AuthConfig.ConfigKey);
var cosmosDbConfigSection = builder.Configuration.GetSection(CosmosDbConfig.ConfigKey);


var kvConfig = keyVaultConfigSection.Get<KeyVaultConfig>();
var authConfig = authConfigSection.Get<AuthConfig>();
var cosmosDbConfig = cosmosDbConfigSection.Get<CosmosDbConfig>();

if(kvConfig == null || cosmosDbConfig == null || authConfig == null)
{
    throw new ConfigurationErrorsException("Missing configuration");
} 

builder.Services.AddSingleton(kvConfig);
builder.Services.AddSingleton(authConfig);
builder.Services.AddSingleton(cosmosDbConfig);


builder.Services.AddAuthentication(AppAuthenticationScheme.EarthSeaGameBearer)
    .AddJwtBearer(AppAuthenticationScheme.EarthSeaGameBearer, options =>
    {


        var kvUri = new Uri(kvConfig.KeyVaultUri);

        var credentials = new DefaultAzureCredential();
        var keyClient = new KeyClient(kvUri, credentials);
        var key = keyClient.GetKey(kvConfig.KeyVaultKeyName);
        var signingKey = key.Value.Key.ToRSA();

        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidIssuer = authConfig.Issuer,
            ValidAudience = authConfig.Audience,
            IssuerSigningKey = new RsaSecurityKey(signingKey),
            ValidateLifetime = true,
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                // If the request is for our hub...
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    (path.StartsWithSegments("/hubs/chat")))
                {
                    // Read the token out of the query string
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    })
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"), jwtBearerScheme: AppAuthenticationScheme.AzureAdBearer);

builder.Services.AddCors(corsSetup =>
{
    corsSetup.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(authConfig.Audience);
        policy.WithMethods("GET", "POST");
        policy.AllowAnyHeader();
        policy.AllowCredentials();
    });
});

builder.Services.AddScoped<IGameLobbyService, GameLobbyService>();
builder.Services.AddScoped<IJwtService, JwtService>();

builder.Services
    .AddSignalR()
    .AddAzureSignalR();

builder.Services.AddSingleton<IUserIdProvider, NameUserIdProvider>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");
app.Run();
