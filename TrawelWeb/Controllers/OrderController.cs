using DataAccsessLayer.Concrete;
using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TrawelWeb.Controllers
{
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult List()
        {
            List<Order> orderList= _context.Order.ToList();
            return View(orderList);
        }
    }
}
