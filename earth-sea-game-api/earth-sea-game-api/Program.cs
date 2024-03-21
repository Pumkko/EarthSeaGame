using Azure.Identity;
using Azure.Security.KeyVault.Keys;
using EarthSeaGameApi;
using EarthSeaGameApi.Hubs;
using EarthSeaGameApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    var kvUri = new Uri("https://earth-sea-game-kv.vault.azure.net/");

    var credentials = new DefaultAzureCredential();
    var keyClient = new KeyClient(kvUri, credentials);
    var key = keyClient.GetKey("earth-sea-game-kv-key");
    var signingKey = key.Value.Key.ToRSA();

    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidIssuer = "https://localhost:7071",
        ValidAudience = "http://localhost:5173",
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
});

builder.Services.AddCors(corsSetup =>
{
    corsSetup.AddPolicy("SIGNALR_POLICY", policy =>
    {
        policy.WithOrigins("http://localhost:5173");
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
app.UseCors("SIGNALR_POLICY");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();


app.MapHub<ChatHub>("/hubs/chat");

app.Run();
