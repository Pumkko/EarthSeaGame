# What did I Learn

## JWT With Azure KeyVault Key

### Building the JWT

I First tried to build the JWT using the `JwtSecurityTokenHandler` and the `SigningCredentials` classes but it did not work. I think the reason is the `SigningCredentials` class needs the private key to sign the token but since i'm using an Azure KeyVault key I do not hold the private key it stays on Azure. I eventually found this SO answer (and the thread in general) helpful [Sign JWT token using Azure Key Vault](https://stackoverflow.com/a/69126059/5076707). Using the `CryptographyClient` class with the URI for the key in the KeyVault works great the only downside is i need to build the token myself. But it's not so hard especially since [jwt.io/introduction](https://jwt.io/introduction) explains the mechanism very well.

### Validate the Token

For that I was able to use the `TokenValidationParameters` class very easily. I struggled at first to understand why an obviously expired token was still considered valid by the server. I then realised that there's a `ClockSkew` property with a default value of 5 minutes. I did not know we had a mechanism specifically to deal with servers clock being out of sync but it makes sense. Of course since i was testing and running everything locally this property actually "increased" the lifetime of the token by 5 minutes but it's  alright. At least i know that now.

## Solid JS 

### Resources

Solid's `createResource` is amazing, from la doc : 
 > takes an asynchronous fetcher function and returns a signal that is updated with the resulting data when the fetcher completes.

 ### onCleanup and onMount 

 Did not use `onMount` but `onCleanup` is great from la doc again :
 #### onMount
 > Registers a method that runs after initial render and elements have been mounted. Ideal for using refs and managing other one time side effects. It is equivalent to a createEffect which does not have any dependencies.

 #### onCleanup
 > Registers a cleanup method that executes on disposal or recalculation of the current reactive scope. Can be used in any Component or Effect.

 ### i18n 

 Used [SolidJs i18n](https://github.com/solidjs-community/solid-primitives/tree/main/packages/i18n#readme) and it's great especially the Nested Object Syntax part, from la doc again : 
 > String paths passesd to the translator don't allow for taking advantage of TypeScript's "Go to definition", and "Find all references", "Rename" features.
 If you prefer to use nested objects instead of dot notation, you can use chainedTranslator helper.
 It takes a dictionary (not flattened) to map it's shape and a translator function for resolving the translations.

 