targetScope = 'subscription'
param location string = 'eastus'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: 'earth-sea-game-rg'
  location: location 
}

module signalR 'signalRService.bicep' = {
  name: 'signalRModule'
  scope: resourceGroup
  params: {
    location: location
  }
}

module cosmosDb 'cosmosDb.bicep' = {
  scope: resourceGroup
  name: 'cosmosDbModule'
  params: {
    location: location
  }
}

module keyVault 'keyVault.bicep' = {
  scope: resourceGroup
  name: 'keyVaultModule'
  params: {
    location: location
  }
}

module staticWebApp 'staticWebApp.bicep' = {
  scope: resourceGroup
  name: 'staticWebAppModule'
  params: {
    location: 'eastus2'
  }
}

module appService 'appService.bicep' = {
  scope: resourceGroup
  name: 'appServiceModule'
  params: {
    audienceUrl: 'https://www.pumkko.dev/'
    cosmosDbConnectionStringSecretName: keyVault.outputs.cosmosDbConnectionStringSecretName
    cosmosDbDatabaseName: cosmosDb.outputs.databaseName
    cosmosDbGameContainerName: cosmosDb.outputs.containerName
    keyVaultName: keyVault.outputs.keyVaultName
    keyVaultKeyName: keyVault.outputs.keyVaultKeyName
    signalRConnectionStringSecretName: keyVault.outputs.signalRConnectionStringSecretName
    location: location
  }
}

module role 'appServiceKeyVaultReaderRole.bicep' = {
  scope: resourceGroup
  name: 'roleModule'
  params: {
    keyVaultName: keyVault.outputs.keyVaultName
    webAppPrincipalId: appService.outputs.webAppSystemIdentityPrincipalId
  }
}
