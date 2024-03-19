using Azure.Identity;
using Azure.Security.KeyVault.Keys;
using EarthSeaGameApi.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

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

builder.Services
    .AddSignalR()
    .AddAzureSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("SIGNALR_POLICY");
app.UseAuthorization();

app.MapControllers();


app.MapHub<ChatHub>("/chat");

app.Run();
