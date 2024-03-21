using Azure.Identity;
using Azure.Security.KeyVault.Keys.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace EarthSeaGameApi.Services
{
    public class JwtService : IJwtService
    {
        public async Task<string> GenerateTokenForGameAsync(string gameMaster, string nation)
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

            var jwt = new JwtSecurityToken("https://localhost:7071", "http://localhost:5173", claims, DateTime.UtcNow, DateTime.UtcNow.AddHours(12));

            var header = @"{""alg"":""RS256"",""typ"":""JWT""}";
            var payload = JsonSerializer.Serialize(jwt.Payload);
            var headerAndPayload = $"{Base64UrlEncoder.Encode(header)}.{Base64UrlEncoder.Encode(payload)}";

            var cryptoClient = new CryptographyClient(new Uri("https://earth-sea-game-kv.vault.azure.net/keys/earth-sea-game-kv-key"), new DefaultAzureCredential());

            var digest = SHA256.HashData(Encoding.ASCII.GetBytes(headerAndPayload));
            var signature = (await cryptoClient.SignAsync(SignatureAlgorithm.RS256, digest)).Signature;
            var token = $"{headerAndPayload}.{Base64UrlEncoder.Encode(signature)}";
            return token;
        }
    }
}
