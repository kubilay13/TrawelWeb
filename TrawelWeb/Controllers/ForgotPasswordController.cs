using DataAccsessLayer.Concrete;
using Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TrawelWeb.Models;

namespace TrawelWeb.Controllers
{
    public class ForgotPasswordController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _db;
        private readonly RoleManager<AppRole> _roleManager;

        public ForgotPasswordController(RoleManager<AppRole> roleManager, ApplicationDbContext db, UserManager<AppUser> userManager)
        {
            _roleManager = roleManager;
            _db = db;
            _userManager = userManager;
        }

    }
}
