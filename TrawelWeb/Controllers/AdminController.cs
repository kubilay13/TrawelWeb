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


        //--StartModerator--

        [Authorize(Roles = "Admin")]
        public IActionResult ModaretorManagement()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
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
                           PhoneNumber = User.PhoneNumber,
                           UserName = User.UserName,
                           Email = User.Email,
                           Adress = User.Adress
                       }

            };

            return Json(list);

        }

        [Authorize(Roles = "Admin")]
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
                           PhoneNumber = User.PhoneNumber,
                           UserName = User.UserName,
                           Email = User.Email,
                           Adress = User.Adress,
                       }
            };
            return Json(list);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddModaretor(ModaretorViewModel modaretorViewModel)
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
                    return BadRequest("Ekleme işlemi başarısız.");
                }

            }
            return View();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> UpdateModaretor(ModaretorViewModel modaretorViewModel, string userId)
        {
            if (modaretorViewModel.Password == modaretorViewModel.ConfirmPassword)
            {
                var user = await _userManager.FindByIdAsync(userId);
                user.FirstName = modaretorViewModel.FirstName;
                user.LastName = modaretorViewModel.LastName;
                user.Adress = modaretorViewModel.Adress;
                user.PhoneNumber = modaretorViewModel.PhoneNumber;
                user.UserName = modaretorViewModel.UserName;
                user.Email = modaretorViewModel.Email;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, modaretorViewModel.Password);
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            return View();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> DeleteModaretor(string userId)
        {
            if (userId != null)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user != null)
                {
                    var role = await _db.UserRoles.FirstOrDefaultAsync(q => q.UserId == user.Id);
                    if (role != null)
                    {
                        _db.UserRoles.Remove(role);
                        await _db.SaveChangesAsync();
                        await _userManager.DeleteAsync(user);
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("Silme işlemi başarısız!");
                    }
                }
                else
                {
                    return BadRequest("Aradığınız kullanıcı bulunamadı!");
                }
            }
            else
            {
                return BadRequest("Hata! Tekrar deneyiniz.");
            }

            return View();
        }

        //--EndModaretor--

        //--StartUser--

        [Authorize(Roles = "Moderator,Admin")]
        public IActionResult UserManagement()
        {
            return View();
        }
        [Authorize(Roles = "Moderator,Admin")]
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var list = new
            {
                data = from UserRoles in _db.UserRoles.Where(q => q.RoleId == 3)
                       join User in _db.Users
                       on UserRoles.UserId equals User.Id
                       select new
                       {
                           UserId = User.Id,
                           FirstName = User.FirstName,
                           LastName = User.LastName,
                           PhoneNumber = User.PhoneNumber,
                           UserName = User.UserName,
                           Email = User.Email,
                           Adress = User.Adress
                       }

            };

            return Json(list);

        }

        [Authorize(Roles = "Moderator,Admin")]
        [HttpGet]
        public async Task<IActionResult> EditUser(int userId)
        {
            var list = new
            {
                data = from User in _db.Users.Where(q => q.Id == userId)
                       select new
                       {
                           UserId = User.Id,
                           FirstName = User.FirstName,
                           LastName = User.LastName,
                           PhoneNumber = User.PhoneNumber,
                           UserName = User.UserName,
                           Email = User.Email,
                           Adress = User.Adress,
                       }
            };
            return Json(list);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> UpdateUser(UserViewModel userViewModel, string userId)
        {
            if (userViewModel.Password == userViewModel.ConfirmPassword)
            {
                var user = await _userManager.FindByIdAsync(userId);
                user.FirstName = userViewModel.FirstName;
                user.LastName = userViewModel.LastName;
                user.Adress = userViewModel.Adress;
                user.PhoneNumber = userViewModel.PhoneNumber;
                user.UserName = userViewModel.UserName;
                user.Email = userViewModel.Email;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, userViewModel.Password);
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            return View();
        }
        [Authorize(Roles = "Moderator,Admin")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            if (userId != null)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user != null)
                {
                    var role = await _db.UserRoles.FirstOrDefaultAsync(q => q.UserId == user.Id);
                    if (role != null)
                    {
                        _db.UserRoles.Remove(role);
                        await _db.SaveChangesAsync();
                        await _userManager.DeleteAsync(user);
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("Silme işlemi başarısız!");
                    }
                }
                else
                {
                    return BadRequest("Aradığınız kullanıcı bulunamadı!");
                }
            }
            else
            {
                return BadRequest("Hata! Tekrar deneyiniz.");
            }

            return View();
        }

        //--EndUser--


        //--StartSeaVehicleOrder--

        [Authorize(Roles = "Admin,Moderator")]
        public IActionResult SeaVehicleOrder()
        {
            return View();
        }


        //--EndSeaVehicleOrder--



        //--StartCarOrder--

        [Authorize(Roles = "Moderator,Admin")]
        public IActionResult CarOrder()
        {
            return View();
        }
        [Authorize(Roles = "Moderator,Admin")]
        [HttpGet]
        public async Task<IActionResult> GetCarOrder()
        {
            var list = new
            {
                data = from Order in _db.Order
                       select new
                       {
                           Id = Order.ID,
                           Brand = Order.Brand,
                           Model = Order.Model,
                           Year = Order.Year,
                           Color = Order.Color,
                           ModaretorId = Order.ModaretorId,
                           Type = Order.Type,
                       }

            };

            return Json(list);

        }
        [Authorize(Roles = "Moderator,Admin")]
        [HttpGet]
        public IActionResult AddCarOrder()
        {
            return View();
        }
        [Authorize(Roles = "Moderator,Admin")]
        [HttpPost]
        public async Task<IActionResult> AddCarOrder(CarsViewModel carsViewModel)
        {

            var Modaretor = await _userManager.FindByNameAsync(User.Identity.Name);
            if (Modaretor != null)
            {

                Order order = new Order()
                {
                    Brand = carsViewModel.Brand,
                    Color = carsViewModel.Color,
                    Year = carsViewModel.Year,
                    ModaretorId = Modaretor.Id,
                    Model = carsViewModel.Model,
                    Status = false
                };
                var resultOrder = _db.Order.Add(order);
                _db.SaveChanges();
                if (resultOrder != null)
                {
                    Cars cars = new Cars()
                    {
                        Brand = carsViewModel.Brand,
                        CaseType = carsViewModel.CaseType,
                        Color = carsViewModel.Color,
                        EngineCapacity = carsViewModel.EngineCapacity,
                        EnginePower = carsViewModel.EnginePower,
                        FuelType = carsViewModel.FuelType,
                        GearType = carsViewModel.GearType,
                        KM = carsViewModel.KM,
                        Model = carsViewModel.Model,
                        Year = carsViewModel.Year,
                    };
                    var resultCarOrder = _db.Cars.Add(cars);
                    _db.SaveChanges();
                    if (resultCarOrder != null)
                    {
                        OrderCategory orderCategory = new OrderCategory()
                        {
                            OrderId = order.ID,
                            ProductId = cars.ID,
                            Type = Order.CategoryType.Car
                        };
                        _db.OrderCategory.Add(orderCategory);
                        _db.SaveChanges();
                        return Ok("Araba ilanı ekleme işlemi başarılı");
                    }

                }
                else
                {
                    return BadRequest("Ekleme işlemi başarısız!");
                }

            }

            else
            {
                return BadRequest("İlan ekleme işlemi başarısız.");
            }

            return View();
        }
        public async Task<IActionResult> DeleteCarOrder(int Id)
        {
            if (Id != null)
            {
                var order = await _db.Order.FindAsync(Id);
                if (order != null)
                {
                    var orderCategory = await _db.OrderCategory.FirstOrDefaultAsync(q => q.OrderId == order.ID);
                    if (orderCategory != null)
                    {
                        var car = await _db.Cars.FirstOrDefaultAsync(q => q.ID == orderCategory.ProductId);

                        if (car != null)
                        {
                            _db.Order.Remove(order);
                            _db.OrderCategory.Remove(orderCategory);
                            _db.Cars.Remove(car);
                            await _db.SaveChangesAsync();
                            return Ok();
                        }
                        else
                        {
                            return BadRequest("Silme işlemi başarısız!");
                        }
                    }
                    else
                    {
                        return BadRequest("Silme işlemi başarısız!");
                    }
                }
                else
                {
                    return BadRequest("Aradığınız kullanıcı bulunamadı!");
                }
            }
            else
            {
                return BadRequest("Hata! Tekrar deneyiniz.");
            }

            return View();
        }
        [Authorize(Roles = "Moderator,Admin")]
        public IActionResult EditCarOrder(int Id)
        {
            return View();
        }
        [Authorize(Roles = "Moderator,Admin")]
        [HttpGet]
        public async Task<IActionResult> GetEditCarOrder(int Id)
        {
            var Modaretor = await _userManager.FindByNameAsync(User.Identity.Name);

            var list = new
            {
                data = from Order in _db.Order.Where(q => q.ID == Id && q.ModaretorId == Modaretor.Id)
                       join OrderCategory in _db.OrderCategory.Where(q => q.Type == Order.CategoryType.Car)
                       on Order.ID equals OrderCategory.OrderId
                       join Cars in _db.Cars
                       on OrderCategory.ProductId equals Cars.ID
                       select new
                       {
                           CarsId = Order.ID,
                           OrderId = Order.ID,
                           Brand = Cars.Brand,
                           Model = Cars.Model,
                           Year = Cars.Year,
                           Color = Cars.Color,
                           ModaretorId = Order.ModaretorId,
                           Type = Order.Type,
                           FuelType = Cars.FuelType,
                           GearType = Cars.GearType,
                           KM = Cars.KM,
                           CaseType = Cars.CaseType,
                           EnginePower = Cars.EnginePower,
                           EngineCapacity = Cars.EngineCapacity,
                       }
            };
            return Json(list);
        }


        //--EndCarOrder--
    }


}
