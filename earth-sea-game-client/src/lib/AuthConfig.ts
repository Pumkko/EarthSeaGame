import { Configuration, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_AD_TENANT_ID}`,
        redirectUri: "/",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you're having issues on Internet Explorer 11 or Edge
    },
};

export const loginRequest = {
    scopes: [import.meta.env.VITE_AZURE_AD_API_SCOPE],
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const PlayerTokenLocalStorageKey = "earthSeaGame:PlayerToken";
