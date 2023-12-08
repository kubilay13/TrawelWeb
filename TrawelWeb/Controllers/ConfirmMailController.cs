using Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TrawelWeb.Models;

namespace TrawelWeb.Controllers
{
    public class ConfirmMailController : Controller
    {
        private readonly UserManager<AppUser> _userManager;

        public ConfirmMailController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var value = TempData["Mail"];
            var valuex = TempData["Id"];
            ViewBag.v=value;
            ViewBag.v2= valuex;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Index(ConfirmMailViewModel confirmMailViewModel)
        {
            var email=confirmMailViewModel.Email;
            var user = await _userManager.FindByIdAsync(confirmMailViewModel.Id);
            if (user.ConfirmCode == confirmMailViewModel.ConfirmeCode)
            {
                user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);
                return Ok(true);
            }
            return View();

        }
    }
}
