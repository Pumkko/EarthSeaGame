﻿using System.ComponentModel.DataAnnotations;

namespace EarthSeaGameApi.Models.Inputs
{
    public class JoinLobbyInput
    {
        public required string GameMasterName { get; set; }

        [Nation]
        public required string Nation { get; set; }

        public required Guid InviteCode { get; set; }
    }
}
