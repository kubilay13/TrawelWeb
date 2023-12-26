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
        private readonly IWebHostEnvironment _webHostEnvironment;



        public AdminController(ApplicationDbContext db, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _userManager = userManager;
            _roleManager = roleManager;
            _webHostEnvironment = webHostEnvironment;
        }
        [Authorize(Roles = "Admin,Moderator")]
        [HttpGet]
        public IActionResult MyProfil()
        {
            return View();
        }
        [Authorize(Roles = "Admin,Moderator")]
        [HttpGet]
        public async Task<IActionResult> GetMyProfil()
        {
            var value = await _userManager.FindByNameAsync(User.Identity.Name);
            AppUserEditDto appUserEditDto = new AppUserEditDto();
            appUserEditDto.FirstName = value.FirstName;
            appUserEditDto.LastName = value.LastName;
            appUserEditDto.Adress = value.Adress;
            appUserEditDto.PhoneNumber = value.PhoneNumber;
            appUserEditDto.UserName = value.UserName;
            appUserEditDto.Email = value.Email;
            return Ok(value);
        }
        [Authorize(Roles = "Admin,Moderator")]
        [HttpPost]
        public async Task<IActionResult> SaveProfile(AppUserEditDto appUserEditDto)
        {
            if (appUserEditDto.Password == appUserEditDto.ConfirmPassword)
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                user.FirstName = appUserEditDto.FirstName;
                user.LastName = appUserEditDto.LastName;
                user.Adress = appUserEditDto.Adress;
                user.PhoneNumber = appUserEditDto.PhoneNumber;
                user.UserName = appUserEditDto.UserName;
                user.Email = appUserEditDto.Email;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, appUserEditDto.Password);
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            return View();
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
        public async Task<IActionResult> AddCarOrder([FromForm] CarsViewModel carsViewModel)
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

                    //AddImage

                    string wwwrootPath = _webHostEnvironment.WebRootPath;

                    // wwwroot/order/cars klasörünün fiziksel yolu
                    string orderCarsFolderPath = Path.Combine(wwwrootPath, "order", "cars");

                    var orderId = order.ID;
                    // orderId'ye özel bir klasör oluştur
                    string orderSpecificFolderPath = Path.Combine(orderCarsFolderPath, orderId.ToString());

                    // Eğer klasör yoksa oluştur
                    if (!Directory.Exists(orderSpecificFolderPath))
                    {
                        Directory.CreateDirectory(orderSpecificFolderPath);
                    }

                    // Her bir fotoğrafı işleyin
                    foreach (var item in carsViewModel.Photos)
                    {
                        // Dosya adını orderId ve benzersiz bir sıra numarasıyla oluşturun
                        string uniqueFileName = $"{order.ID}_{Guid.NewGuid().ToString()}_{item.FileName}";
                        string relativePath = Path.Combine("\\order\\cars\\", order.ID.ToString(), uniqueFileName);
                        // Dosyanın tam yolu
                        string filePath = Path.Combine(orderSpecificFolderPath, uniqueFileName);

                        // Dosyayı kaydet
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            item.CopyTo(fileStream);
                        }

                        // Veritabanında bu dosyanın adını ve yolunu kaydedebilirsiniz
                        // Örneğin: SaveToDatabase(filePath);
                        Photo photo = new Photo()
                        {

                            OrderId = order.ID,
                            Name = relativePath  // Dosya adı ve yolunu içeren bir dize
                        };
                        _db.Photo.Add(photo);
                        _db.SaveChanges();
                    }

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
                        var photos = _db.Photo.Where(q => q.OrderId == order.ID && orderCategory.Type == Order.CategoryType.Car).ToList();
                        var car = await _db.Cars.FirstOrDefaultAsync(q => q.ID == orderCategory.ProductId);

                        if (car != null)
                        {
                            foreach (var item in photos)
                            {
                                var fileName = item.Name;
                                //var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "order", item.Name);
                                //var directoryPath = Path.GetDirectoryName(filePath);


                                _db.Photo.Remove(item);
                                //var filePath = Path.Combine(_webHostEnvironment.WebRootPath + fileName);
                                //try
                                //{
                                //    using (var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
                                //    {
                                //        // Dosya kullanımda değilse
                                //        System.IO.File.Delete(filePath);
                                //        Console.WriteLine("Dosya başarıyla silindi.");
                                //    }
                                //}
                                //catch (Exception ex)
                                //{
                                //    Console.WriteLine("Dosya silme hatası: " + ex.Message);
                                //}
                            }
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
                           CarsId = Cars.ID,
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
                           Photos = (from Photo in _db.Photo.Where(p => p.OrderId == Order.ID)
                                     select new
                                     {
                                         Id = Photo.ID,
                                         Name = Photo.Name,
                                     }).ToList()
                       }
            };
            return Json(list);
        }
        [Authorize(Roles = "Moderator,Admin")]
        [HttpGet]
        public async Task<IActionResult> GetCarOrderImage(int Id)
        {
            var Modaretor = await _userManager.FindByNameAsync(User.Identity.Name);

            var list = new
            {
                data = (from Photo in _db.Photo.Where(p => p.OrderId == Id)
                        select new
                        {
                            Id = Photo.ID,
                            Name = Photo.Name,
                        }).ToList()

            };
            return Json(list);
        }

        [Authorize(Roles = "Admin,Moderator")]
        [HttpPost]
        public async Task<IActionResult> UpdateCarOrder([FromForm] CarsViewModel carsViewModel, string CarsId, string OrderId)
        {

            if (carsViewModel != null)
            {
                var carId = Convert.ToInt32(CarsId);
                var orderId = Convert.ToInt32(OrderId);

                var cars = _db.Cars.Where(q => q.ID == carId).FirstOrDefault();
                var order = _db.Order.Where(q => q.ID == orderId).FirstOrDefault();


                if (cars != null && order != null)
                {

                    cars.KM = carsViewModel.KM;
                    cars.Color = carsViewModel.Color;
                    cars.Brand = carsViewModel.Brand;
                    cars.Model = carsViewModel.Model;
                    cars.Year = carsViewModel.Year;
                    cars.CaseType = carsViewModel.CaseType;
                    cars.EngineCapacity = carsViewModel.EngineCapacity;
                    cars.EnginePower = carsViewModel.EnginePower;
                    cars.FuelType = carsViewModel.FuelType;
                    cars.GearType = carsViewModel.GearType;

                    order.Brand = carsViewModel.Brand;
                    order.Model = carsViewModel.Model;
                    order.Year = carsViewModel.Year;
                    order.Color = carsViewModel.Color;

                    _db.Order.Update(order);
                    _db.Cars.Update(cars);
                    var photos = _db.Photo.Where(q => q.OrderId == order.ID && order.Type == Order.CategoryType.Car).ToList();

                    if (photos != null)
                    {
                        foreach (var item in photos)
                        {
                            _db.Photo.Remove(item);
                        }
                        //AddImage

                        string wwwrootPath = _webHostEnvironment.WebRootPath;

                        // wwwroot/order/cars klasörünün fiziksel yolu
                        string orderCarsFolderPath = Path.Combine(wwwrootPath, "order", "cars");
                        // orderId'ye özel bir klasör oluştur
                        string orderSpecificFolderPath = Path.Combine(orderCarsFolderPath, orderId.ToString());

                        // Eğer klasör yoksa oluştur
                        if (!Directory.Exists(orderSpecificFolderPath))
                        {
                            Directory.CreateDirectory(orderSpecificFolderPath);
                        }
                        foreach (var item in carsViewModel.Photos)
                        {
                            // Dosya adını orderId ve benzersiz bir sıra numarasıyla oluşturun
                            string uniqueFileName = $"{order.ID}_{Guid.NewGuid().ToString()}_{item.FileName}";
                            string relativePath = Path.Combine("\\order\\cars\\", order.ID.ToString(), uniqueFileName);
                            // Dosyanın tam yolu
                            string filePath = Path.Combine(orderSpecificFolderPath, uniqueFileName);

                            // Dosyayı kaydet
                            using (var fileStream = new FileStream(filePath, FileMode.Create))
                            {
                                item.CopyTo(fileStream);
                            }

                            // Veritabanında bu dosyanın adını ve yolunu kaydedebilirsiniz
                            // Örneğin: SaveToDatabase(filePath);
                            Photo photo = new Photo()
                            {

                                OrderId = order.ID,
                                Name = relativePath  // Dosya adı ve yolunu içeren bir dize
                            };
                            _db.Photo.Add(photo);

                            _db.SaveChanges();

                        }

                        return Ok();

                    }

                    else
                    {
                        return BadRequest("Güncelleme Başarısız!");
                    }



                }
                else
                {
                    return BadRequest("Güncelleme Başarısız!");
                }
            }
            else
            {
                return BadRequest("Güncelleme Başarısız!");
            }
            //--EndCarOrder--
        }


    }
}