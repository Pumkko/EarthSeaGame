import { HubConnectionBuilder } from "@microsoft/signalr";

export const signalRConnection = new HubConnectionBuilder().withUrl("https://localhost:7071/chat").build();

await signalRConnection.start();

signalRConnection.on("joinLobby", () => {
    console.log("Received joinLobby");
});
