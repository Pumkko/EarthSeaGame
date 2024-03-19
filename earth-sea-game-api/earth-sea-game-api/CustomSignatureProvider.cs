using Azure.Security.KeyVault.Keys.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace EarthSeaGameApi
{
    public class CustomSignatureProvider(CryptographyClient cryptoClient,
        SecurityKey key,
        string algorithm) : SignatureProvider(key, algorithm)
    {
        private readonly CryptographyClient _cryptoClient = cryptoClient;

        public override byte[] Sign(byte[] input)
        {
            var result = _cryptoClient.Sign(SignatureAlgorithm.RS256, GetSHA256(input));

            return result.Signature;
        }

        public override bool Verify(byte[] input, byte[] signature)
        {
            var verificationResult = _cryptoClient.Verify(SignatureAlgorithm.RS256,
                GetSHA256(input),
                signature);

            return verificationResult.IsValid;
        }

        protected override void Dispose(bool disposing)
        {
        }

        private byte[] GetSHA256(byte[] input)
        {
            return SHA256.HashData(input);
        }
    }
}
