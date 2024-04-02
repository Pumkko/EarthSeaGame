param keyVaultName string
param webAppPrincipalId string 


resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' existing = {
  name: keyVaultName
}

resource keyVaultSecretUserRoleDefinition 'Microsoft.Authorization/roleDefinitions@2022-05-01-preview' existing = {
  scope: subscription()
  name: '4633458b-17de-408a-b874-0445c86b69e6'
}


resource roleAssignmentKeyVaultSecretUser 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: keyVault
  name: guid(keyVault.id, webAppPrincipalId, keyVaultSecretUserRoleDefinition.id)
  properties: {
    roleDefinitionId: keyVaultSecretUserRoleDefinition.id
    principalId: webAppPrincipalId
    principalType: 'ServicePrincipal'
  }
}


resource keyVaultKeyUserRoleDefinition 'Microsoft.Authorization/roleDefinitions@2022-05-01-preview' existing = {
  scope: subscription()
  name: '12338af0-0e69-4776-bea7-57ae8d297424'
}


resource roleAssignmentKeyVaultKeyUser 'Microsoft.Authorization/roleAssignments@2022-04-01'  = {
  scope: keyVault
  name: guid(keyVault.id, webAppPrincipalId, keyVaultKeyUserRoleDefinition.id)
  properties: {
    roleDefinitionId: keyVaultKeyUserRoleDefinition.id
    principalId: webAppPrincipalId
    principalType: 'ServicePrincipal'
  }
}
