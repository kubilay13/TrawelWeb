using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    public class OurCarsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
