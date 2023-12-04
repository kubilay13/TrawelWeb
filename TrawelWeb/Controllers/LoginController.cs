using DTOLayer.Dtos.AppUserDtos;
using Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    public class LoginController : Controller
    {
        private readonly UserManager<AppUser> _userManager;

        public LoginController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SignUp(AppUserSignUpDto appUserSignUpDto) 
        {
            if(ModelState.IsValid)
            {
                AppUser appUser=new AppUser()
                {
                    FirstName = appUserSignUpDto.FirstName,
                    LastName = appUserSignUpDto.LastName,
                    UserName = appUserSignUpDto.UserName,
                    Email = appUserSignUpDto.Email,                  
                    Adress = appUserSignUpDto.Adress,
                    PhoneNumber = appUserSignUpDto.PhoneNumber,
                };
                var result = await _userManager.CreateAsync(appUser, appUserSignUpDto.Password);
                if(result.Succeeded)
                {
                    return RedirectToAction("Index", "ConfirmMail");
                }
            }
            return View();
        }

    }
}
