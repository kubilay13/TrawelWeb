using DataAccsessLayer.Concrete;
using DTOLayer.Dtos.ContactUserDtos;
using Entity;
using Microsoft.AspNetCore.Mvc;

namespace TrawelWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            List<Cars> carsList = _context.Cars.ToList();
            List<Order> orderList = _context.Order.ToList();
            Tuple<List<Cars>, List<Order>> combinedData = new Tuple<List<Cars>, List<Order>>(carsList, orderList);
            return View(combinedData);
        }
        public IActionResult Contact()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SendMessage(ContactUserDto contactUserDto)
        {

            if (ModelState.IsValid)
            {
                ContactUser contact = new ContactUser()
                {
                    FirstName = contactUserDto.FirstName,
                    LastName = contactUserDto.LastName,
                    Email = contactUserDto.Email,
                    Message = contactUserDto.Message,
                    Subject = contactUserDto.Subject,
                    Status= ContactUser.Type.Failure
                    
                };
                _context.Add(contact);
                _context.SaveChanges();
                return Ok();
            }
            return View();
        }
    }
}
