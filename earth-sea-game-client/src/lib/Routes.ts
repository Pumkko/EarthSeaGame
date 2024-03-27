const Routes = {
    startingMenu: "/",
    playerLobby: {
        root: "/player",
        playerHome: "/",
        chat: "chat",
    },
    gameMasterLobby: {
        createLobby: "/lobby/my/create",
        gateway: "/lobby/my/gateway",
        root: "/lobby/my",
        option: "/",
        spyChat: "chat/spy",
        teamsChat: "chat/teams",
    },
    error: "/error/app",
};

export default Routes;
