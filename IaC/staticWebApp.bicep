@description('Specifies the location for resources.')
param location string

resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: 'earth-sea-game-swa'
  location: location
  properties: {
    
  }
  sku: {
    tier: 'Free'
    name: 'Free'
  }
}
