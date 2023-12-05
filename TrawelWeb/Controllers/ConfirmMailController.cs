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
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Confirm(ConfirmMailViewModel confirmMailViewModel)
        {
            var value = TempData["Mail"];
            var user = await _userManager.FindByEmailAsync(value.ToString());
            if (user.ConfirmCode == confirmMailViewModel.ConfirmCode)
            {
                return RedirectToAction("Index", "ConfirmMail");
            }
            return View();

        }
    }
}
