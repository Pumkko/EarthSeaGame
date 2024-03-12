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
