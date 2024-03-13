@description('Specifies the location for resources.')
param location string

var earthSeaGameDbName = 'earthSeaGameDb'
var gameLobbyContainerName = 'gameLobbyContainer'

resource cosmosDbAccount 'Microsoft.DocumentDB/databaseAccounts@2023-11-15'= {
  name: 'earth-sea-game-db'
  kind: 'GlobalDocumentDB'
  location: location
  properties: {
    databaseAccountOfferType: 'Standard' 
    locations: [
      {
        locationName: 'East Us'
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
  }
}

resource database 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-11-15' = {
  parent: cosmosDbAccount
  name: earthSeaGameDbName
  properties: {
    resource: {
      id: earthSeaGameDbName
    }
  }
}

resource gameLobbyContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-11-15' = {
  parent: database
  name: gameLobbyContainerName
  properties: {
    resource: {
      id: gameLobbyContainerName
      defaultTtl: 86400 
      partitionKey: {
        paths: [
          '/gameMaster'
        ]
        kind: 'Hash'
      }
      uniqueKeyPolicy: {
        uniqueKeys: [
           {
             paths: [
              '/gameMaster'
             ]
           }
        ]
      }
    }
  }
}
