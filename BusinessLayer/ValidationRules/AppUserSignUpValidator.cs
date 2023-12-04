using DTOLayer.Dtos.AppUserDtos;
using FluentValidation;

namespace BusinessLayer.ValidationRules
{
    public class AppUserSignUpValidator: AbstractValidator<AppUserSignUpDto>
    {
        public AppUserSignUpValidator() 
        {
        }
    }
}
