using EarthSeaGameApi.Models;
using System.ComponentModel.DataAnnotations;

namespace EarthSeaGameApi.Models.Inputs
{
    public class NationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if(value == null)
            {
                return new ValidationResult("Nation Can not be null");
            }

            var nation = value.ToString();
            Span<string?> availableNations = [ENation.SeaNation, ENation.EarthNation, ENation.EasternIsland];
            if (!availableNations.Contains(nation))
            {
                return new ValidationResult($"Nation must be a known Nation : {ENation.EarthNation}, {ENation.SeaNation}, {ENation.EasternIsland}");
            }

            return ValidationResult.Success;

        }
    }
}
