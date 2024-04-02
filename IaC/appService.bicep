@description('Specifies the location for resources.')
param location string
param keyVaultName string
param keyVaultKeyName string
param signalRConnectionStringSecretName string
param cosmosDbConnectionStringSecretName string
param cosmosDbDatabaseName string
param cosmosDbGameContainerName string
param audienceUrl string

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: 'earth-sea-game-service-plan'
  location: location
  sku: {
    name: 'F1'
  }
  kind: 'windows'
}

var appServiceName = 'earth-sea-game-api'

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: appServiceName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      metadata: [
        {
          name: 'CURRENT_STACK'
          value: 'dotnet'
        }
      ]
      appSettings: [
        {
          name: 'AzureAd:TenantId'
          value: '903b094c-9957-4fc7-a1a0-9977fe36f6ca'
        }
        {
          name: 'AzureAd:ClientId'
          value: '060e9223-b210-414e-b3a6-a276b8433635'
        }
        {
          name: 'AzureAd:Scopes'
          value: 'GameMaster.All'
        }
        {
          name: 'Auth:Issuer'
          value: 'https://${appServiceName}.azurewebsites.net/'
        }
        {
          name: 'Auth:Audience'
          value: audienceUrl
        }
        {
          name: 'KeyVault:KeyVaultUri'
          value: 'https://${keyVaultName}${environment().suffixes.keyvaultDns}'
        }
        {
          name: 'KeyVault:KeyVaultKeyName'
          value: keyVaultKeyName
        }
        {
          name: 'CosmosDb:DatabaseConnectionString'
          value: '@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=${cosmosDbConnectionStringSecretName})'
        }
        {
          name: 'CosmosDb:DatabaseName'
          value: cosmosDbDatabaseName
        }
        {
          name: 'CosmosDb:ContainerName'
          value: cosmosDbGameContainerName
        }
        {
          name: 'Azure:SignalR:ConnectionString'
          value: '@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=${signalRConnectionStringSecretName})'
        }
      ]
      netFrameworkVersion: 'v8.0'
    }
  }
}

output webAppSystemIdentityPrincipalId string = appService.identity.principalId
