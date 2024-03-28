namespace EarthSeaGameApi.Models.Outputs
{
    public class JoinGameWithTokenOutput
    {

        /// <summary>
        /// Value of ENation
        /// </summary>
        public required string Nation { get; set; }


        public required string GameMaster { get; set; }
    }
}
