using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    [ServiceFilter(typeof(SessionFilter))]
    public class OurCarsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
