import { Configuration, EventType, LogLevel, PublicClientApplication } from "@azure/msal-browser";

export function loggerCallback(_: LogLevel, message: string) {
    console.log(message);
}

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

msalInstance.addEventCallback((event) => {
    if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
            event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
            event.eventType === EventType.SSO_SILENT_SUCCESS) &&
        event.payload !== null &&
        "account" in event.payload &&
        event.payload.account
    ) {
        msalInstance.setActiveAccount(event.payload.account);
    }
});
