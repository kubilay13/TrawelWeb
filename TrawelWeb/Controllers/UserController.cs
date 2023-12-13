using DataAccsessLayer.Concrete;
using DTOLayer.Dtos.AppUserDtos;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    [ServiceFilter(typeof(SessionFilter))]

    public class UserController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _db;

        public UserController(UserManager<AppUser> userManager, ApplicationDbContext db)
        {
            _userManager = userManager;
            _db = db;
        }

        [Authorize(Roles = "User")]
        public IActionResult Index()
        {
            return View();
        }
        [Authorize(Roles = "Admin,User,Moderator")]
        [HttpGet]
        public  IActionResult MyProfil()
        {
            return View();
        }
        [Authorize(Roles = "Admin,User,Moderator")]
        [HttpGet]
        public async Task<IActionResult> GetMyProfil()
        {
            var value = await _userManager.FindByNameAsync(User.Identity.Name);
            AppUserEditDto appUserEditDto = new AppUserEditDto();
            appUserEditDto.FirstName = value.FirstName;
            appUserEditDto.LastName = value.LastName;
            appUserEditDto.Adress = value.Adress;
            appUserEditDto.PhoneNumber = value.PhoneNumber;
            appUserEditDto.UserName = value.UserName;
            appUserEditDto.Email = value.Email;
            return Ok(value);
        }
        [Authorize(Roles = "Admin,User,Moderator")]
        [HttpPost]
        public async Task<IActionResult> SaveProfile(AppUserEditDto appUserEditDto)
        {
            if (appUserEditDto.Password == appUserEditDto.ConfirmPassword)
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                user.FirstName = appUserEditDto.FirstName;
                user.LastName = appUserEditDto.LastName;
                user.Adress = appUserEditDto.Adress;
                user.PhoneNumber = appUserEditDto.PhoneNumber;
                user.UserName = appUserEditDto.UserName;
                user.Email = appUserEditDto.Email;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, appUserEditDto.Password);
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            return View();
        }
    }
}
