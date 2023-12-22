using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult List()
        {
            return View();
        }
    }
}
