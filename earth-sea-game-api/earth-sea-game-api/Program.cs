using EarthSeaGameApi.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseCors("SIGNALR_POLICY");
app.UseAuthorization();

app.MapControllers();


app.MapHub<ChatHub>("/chat");

app.Run();
