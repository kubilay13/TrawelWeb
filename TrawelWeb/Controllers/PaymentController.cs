using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    public class PaymentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
