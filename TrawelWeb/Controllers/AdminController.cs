using DataAccsessLayer.Concrete;
using DTOLayer.Dtos.AppUserDtos;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Extensions;
using Microsoft.EntityFrameworkCore;

namespace TrawelWeb.Controllers
{
    [ServiceFilter(typeof(SessionFilter))]
    [Authorize(Roles = "Moderator,Admin")]
    public class AdminController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _db;

        public AdminController(ApplicationDbContext db, UserManager<AppUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        [Authorize(Roles = "Moderator,Admin")]
        public IActionResult Index()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult AdminManagement()
        {
            return View();
        }
        [Authorize(Roles = "Moderator,Admin")]
        public IActionResult UserManagement()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> GetAdmin()
        {
            //var usersWithRoleIdTwo = _db.UserRoles.Where(ur => ur.RoleId == 2).Select(q => q.UserId).ToList();


            var list = new
            {
                data = from UserRoles in _db.UserRoles.Where(q => q.RoleId == 2)
                       join User in _db.Users
                       on UserRoles.UserId equals User.Id
                       select new
                       {
                           FirstName = User.FirstName,
                           LastName = User.LastName,
                           NumberPhone = User.PhoneNumber,
                           UserName = User.UserName,
                           Email = User.Email,
                       }

            };

            return Json(list);

        }
    }
}
