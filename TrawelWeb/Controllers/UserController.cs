using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        } 
        public IActionResult AdminIndex()
        {
            return View();
        }

    }
}
