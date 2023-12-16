using DataAccsessLayer.Concrete;
using DTOLayer.Dtos.AppUserDtos;
using Entity;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using TrawelWeb.Models;

namespace TrawelWeb.Controllers
{
    public class LoginController : Controller
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly ApplicationDbContext _Context;
        public LoginController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ApplicationDbContext context, RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _Context = context;
            _roleManager = roleManager;
        }
        [HttpGet]
        public IActionResult Index(LoginViewModel loginView)
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn(LoginViewModel loginViewModel)
        {
            var result = await _signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, false, true);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(loginViewModel.UserName);
                if (user != null)
                {
                    var userRoles = await _Context.UserRoles.Where(q => q.UserId == user.Id).FirstOrDefaultAsync();
                    if (userRoles != null)
                    {
                        var RolesID = userRoles.RoleId;
                        var roles = await _Context.Roles.FindAsync(RolesID);
                        if (roles != null)
                        {
                            var roleName = roles.Name;
                            var roleId = roles.Id;

                            if (user.EmailConfirmed == true && roleName == "Admin")
                            {
                                HttpContext.Session.SetString("username", loginViewModel.UserName);
                                return Ok("Admin");
                            }
                            else if (user.EmailConfirmed == true && roleName == "User")
                            {
                                HttpContext.Session.SetString("username", loginViewModel.UserName);
                                return Ok("User");
                            }
                            else if (user.EmailConfirmed == true && roleName == "Moderator")
                            {
                                HttpContext.Session.SetString("username", loginViewModel.UserName);
                                return Ok("Moderator");
                            }
                            else
                            {
                                return BadRequest(new { error = "Emaili!" });
                            }
                        }
                    }

                }

            }
            else
            {

                return BadRequest(new { error = "Şifre ve ya Kullanıcı Adı Yanlış!" });
            }
            var resultx = "Tekrar Deneyiniz..";
            return View(resultx);
        }
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            // Temizleme işlemleri
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
            HttpContext.Session.Clear(); // Session'ı temizle
            return Ok("Çıkış Yapıldı");
        }
        [HttpGet]
        public IActionResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SignUp(AppUserSignUpDto appUserSignUpDto)
        {

            if (ModelState.IsValid)
            {
                Random random = new Random();
                int code;
                code = random.Next(100000, 1000000);
                var existingUser = _Context.Users.FirstOrDefault(u => u.Email == appUserSignUpDto.Email);

                if (existingUser == null)
                {
                    AppUser appUser = new AppUser()
                    {
                        FirstName = appUserSignUpDto.FirstName,
                        LastName = appUserSignUpDto.LastName,
                        UserName = appUserSignUpDto.UserName,
                        Email = appUserSignUpDto.Email,
                        Adress = appUserSignUpDto.Adress,
                        PhoneNumber = appUserSignUpDto.PhoneNumber,
                        ConfirmCode = code
                    };
                    var result = await _userManager.CreateAsync(appUser, appUserSignUpDto.Password);
                    if (result.Succeeded)
                    {
                        var role = await _roleManager.FindByNameAsync("User");//Burada kayıt atanlar normal kullanıcı.
                        if (role != null)
                        {
                            // UserRoles tablosuna kaydı ekle
                            var userRole = new AppUserRoles
                            {
                                RoleId = role.Id,
                                UserId = appUser.Id
                            };

                            _Context.UserRoles.Add(userRole);
                            _Context.SaveChanges();

                            MimeMessage mimeMessage = new MimeMessage();
                            MailboxAddress mailboxAddressFrom = new MailboxAddress("TravelWeb Admin", "proje123x@gmail.com");
                            MailboxAddress mailboxAddressTo = new MailboxAddress("User", appUser.Email);

                            mimeMessage.From.Add(mailboxAddressFrom);
                            mimeMessage.To.Add(mailboxAddressTo);

                            var bodyBuilder = new BodyBuilder();
                            bodyBuilder.TextBody = "Sayın " + appUserSignUpDto.FirstName + " " + appUserSignUpDto.LastName + " Kayıt işlemini gerçekleştirmek için onay kodunuz: " + code;
                            mimeMessage.Body = bodyBuilder.ToMessageBody();

                            mimeMessage.Subject = "TravelWeb Onay Kodu";

                            SmtpClient smtpClient = new SmtpClient();

                            smtpClient.Connect("smtp.gmail.com", 587, false);
                            smtpClient.Authenticate("proje123x@gmail.com", "ovhjcdvgywmjmjqr");
                            smtpClient.Send(mimeMessage);
                            smtpClient.Disconnect(true);

                            TempData["Mail"] = appUserSignUpDto.Email;
                            TempData["Id"] = appUser.Id;

                            return Ok(true);
                            //return RedirectToAction("Index","ConfirmMail");
                        }

                    }
                    else
                    {
                        return BadRequest(new { error = "Aynı Kullanıcı Adı İle Kayıtlı Kullanıcı Var!" });

                    }
                }
                else
                {
                    return BadRequest(new { error = "Aynı Email İle Kayıtlı Kullanıcı Var!" });
                }

            }
            return View();
        }

    }
}
