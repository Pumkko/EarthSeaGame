using Azure.Identity;
using Azure.Security.KeyVault.Keys.Cryptography;
using EarthSeaGameApi.Configs;
using EarthSeaGameApi.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace EarthSeaGameApi.Services
{
    public class JwtService(AuthConfig authConfig, KeyVaultConfig keyVaultConfig) : IJwtService
    {
        public Task<string> GenerateTokenForGameAsync(string gameMaster, string nation)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, $"{gameMaster}:{nation}"),
                new Claim(JwtRegisteredClaimNames.Name, $"{gameMaster}:{nation}"),
                new Claim (AppClaims.GameMasterName, gameMaster),
                new Claim(AppClaims.Nation, nation),
                new Claim(AppClaims.IsGameMaster, "false")
            };

            return GenerateTokenForClaimsAsync(claims);
        }

        public Task<string> GenerateTokenForGameMasterAsync(string gameMaster)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, gameMaster),
                new Claim(JwtRegisteredClaimNames.Name, gameMaster),
                new Claim (AppClaims.GameMasterName, gameMaster),
                new Claim(AppClaims.IsGameMaster, "true")
            };

            return GenerateTokenForClaimsAsync(claims);


        }

        private async Task<string> GenerateTokenForClaimsAsync(IEnumerable<Claim> claims)
        {
            var jwt = new JwtSecurityToken(authConfig.Issuer, authConfig.Audience, claims, DateTime.UtcNow, DateTime.UtcNow.AddHours(12));

            var header = @"{""alg"":""RS256"",""typ"":""JWT""}";
            var payload = JsonSerializer.Serialize(jwt.Payload);
            var headerAndPayload = $"{Base64UrlEncoder.Encode(header)}.{Base64UrlEncoder.Encode(payload)}";

            var cryptoClient = new CryptographyClient(new Uri($"{keyVaultConfig.KeyVaultUri}/keys/{keyVaultConfig.KeyVaultKeyName}"), new DefaultAzureCredential());

            var digest = SHA256.HashData(Encoding.ASCII.GetBytes(headerAndPayload));
            var signature = (await cryptoClient.SignAsync(SignatureAlgorithm.RS256, digest)).Signature;
            var token = $"{headerAndPayload}.{Base64UrlEncoder.Encode(signature)}";
            return token;
        }
    }
}
