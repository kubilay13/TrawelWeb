using DataAccsessLayer.Concrete;
using DTOLayer.Dtos.AppUserDtos;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrawelWeb.Models;

namespace TrawelWeb.Controllers
{
    [ServiceFilter(typeof(SessionFilter))]
    [Authorize(Roles = "Moderator,Admin")]
    public class AdminController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _db;
        private readonly RoleManager<AppRole> _roleManager;


        public AdminController(ApplicationDbContext db, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _db = db;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [Authorize(Roles = "Moderator,Admin")]
        public IActionResult Index()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult ModaretorManagement()
        {
            return View();
        }
        [Authorize(Roles = "Moderator,Admin")]
        public IActionResult UserManagement()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> GetModaretor()
        {
            var list = new
            {
                data = from UserRoles in _db.UserRoles.Where(q => q.RoleId == 2)
                       join User in _db.Users
                       on UserRoles.UserId equals User.Id
                       select new
                       {
                           UserId = User.Id,
                           FirstName = User.FirstName,
                           LastName = User.LastName,
                           NumberPhone = User.PhoneNumber,
                           UserName = User.UserName,
                           Email = User.Email,
                           Adress = User.Adress
                       }

            };

            return Json(list);

        }
        [HttpGet]
        public async Task<IActionResult> EditModaretor(int userId)
        {
            var list = new
            {
                data = from User in _db.Users.Where(q => q.Id == userId)
                       select new
                       {
                           UserId = User.Id,
                           FirstName = User.FirstName,
                           LastName = User.LastName,
                           NumberPhone = User.PhoneNumber,
                           UserName = User.UserName,
                           Email = User.Email,
                           Adress = User.Adress,
                       }
            };
            return Json(list);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddProfile(ModaretorViewModel modaretorViewModel)
        {
            if (modaretorViewModel.Password == modaretorViewModel.ConfirmPassword)
            {
                var Modaretor = await _userManager.FindByNameAsync(User.Identity.Name);
                AppUser appUser = new AppUser()
                {
                    FirstName = modaretorViewModel.FirstName,
                    LastName = modaretorViewModel.LastName,
                    UserName = modaretorViewModel.UserName,
                    Email = modaretorViewModel.Email,
                    Adress = modaretorViewModel.Adress,
                    PhoneNumber = modaretorViewModel.PhoneNumber,

                };
                var result = await _userManager.CreateAsync(appUser, modaretorViewModel.Password);
                if (result.Succeeded)
                {
                    var role = await _roleManager.FindByNameAsync("Moderator");//Burada kayıt atanlar Modaretor kullanıcı.
                    if (role != null)
                    {
                        // UserRoles tablosuna kaydı ekle
                        var userRole = new AppUserRoles
                        {
                            RoleId = role.Id,
                            UserId = appUser.Id
                        };
                        _db.UserRoles.Add(userRole);
                        _db.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return BadRequest();
                }

            }
            return View();
        }
    }
}
