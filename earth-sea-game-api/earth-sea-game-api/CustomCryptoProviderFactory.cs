using Azure.Identity;
using Azure.Security.KeyVault.Keys.Cryptography;
using Azure.Security.KeyVault.Keys;
using Microsoft.IdentityModel.Tokens;

namespace EarthSeaGameApi
{
    public class CustomCryptoProviderFactory : CryptoProviderFactory
    {
        private readonly CryptographyClient _cryptoClient;

        public CustomCryptoProviderFactory()
        {
            _cryptoClient = new CryptographyClient(new Uri("https://earth-sea-game-kv.vault.azure.net/keys/earth-sea-game-kv-key"), new DefaultAzureCredential());
        }

        public override SignatureProvider CreateForSigning(SecurityKey key, string algorithm, bool cacheProvider)
        {
            return new CustomSignatureProvider(_cryptoClient, key, algorithm);
        }

        public override SignatureProvider CreateForVerifying(SecurityKey key, string algorithm)
        {
            return new CustomSignatureProvider(_cryptoClient, key, algorithm);
        }

        public override SignatureProvider CreateForVerifying(SecurityKey key, string algorithm, bool cacheProvider)
        {
            return new CustomSignatureProvider(_cryptoClient, key, algorithm);
        }
    }
}
