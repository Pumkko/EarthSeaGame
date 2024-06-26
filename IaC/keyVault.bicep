@description('Specifies the location for resources.')
param location string

resource keyvault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: 'earth-sea-game-kv'
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    enableRbacAuthorization: true
    tenantId: subscription().tenantId
  }
}

resource signalRConnectionString 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'signalRConnectionString'
  parent: keyvault
  properties: {
    value: ''
  }
}

resource cosmosDbConnectionString 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'cosmosDbConnectionString'
  parent: keyvault
  properties: {
    value: ''
  }
}

resource keyVaultKey 'Microsoft.KeyVault/vaults/keys@2023-07-01' = {
  name: 'earth-sea-game-kv-key'
  parent: keyvault
  properties: {
    kty: 'RSA'
    keySize: 2048
    rotationPolicy: {
      attributes: {
         expiryTime: 'P28D'
      }
      lifetimeActions: [
        {
          action: {
            type: 'rotate'
          }
          trigger: {
             timeBeforeExpiry: 'P7D'
          }
        }
        {
          action: {
             type: 'notify'
          }
          trigger: {
             timeBeforeExpiry: 'P10D'
          }
        }
      ]
    }
  }
}

output keyVaultName string = keyvault.name
output keyVaultKeyName string = keyVaultKey.name
output cosmosDbConnectionStringSecretName string = cosmosDbConnectionString.name
output signalRConnectionStringSecretName string = signalRConnectionString.name
