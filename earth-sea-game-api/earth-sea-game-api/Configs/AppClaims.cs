namespace EarthSeaGameApi.Configs
{
    public struct AppClaims
    {
        public const string GameMasterName = "earthSeaGame:GameMaster";

        /// <summary>
        /// Nation Claim, will only be set if IsGameMaster is false
        /// </summary>
        public const string Nation = "earthSeaGame:Nation";
        public const string IsGameMaster = "earthSeaGame:IsGameMaster";
    }
}
