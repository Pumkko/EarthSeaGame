param location string

resource signalRService 'Microsoft.SignalRService/signalR@2023-08-01-preview' = {
  
  name: 'earth-sea-game-signalr-chat'
  location: location
  kind: 'SignalR'
  properties: {
    features: [
      {
        flag: 'ServiceMode'
        value: 'Default'
      }
    ]
    cors: {
      allowedOrigins: [
        '*'
      ]
    }
    
  }
  sku: {
    name: 'Free_F1'
    tier: 'Free'
    capacity: 1
  }

}
