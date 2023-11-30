using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        } 
        public IActionResult SignUp()
        {
            return View();
        }
    }
}
