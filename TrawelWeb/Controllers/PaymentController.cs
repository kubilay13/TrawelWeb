using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    public class PaymentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        } 
        public IActionResult Card()
        {
            return View();
        }
        public IActionResult SalesDetail()
        {
            return View();
        }
        public IActionResult BTC()
        {
            return View();
        }
    }
}
