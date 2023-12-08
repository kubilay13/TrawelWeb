using DataAccsessLayer.Concrete;
using DTOLayer.Dtos.AppUserDtos;
using Entity;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using TrawelWeb.Models;

namespace TrawelWeb.Controllers
{
    public class LoginController : Controller
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ApplicationDbContext _Context;
        public LoginController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _Context = context;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SignIn(LoginViewModel loginViewModel)
        {
            var result = await _signInManager.PasswordSignInAsync(loginViewModel.UserName,loginViewModel.Password,false,true);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(loginViewModel.UserName);
                if (user.EmailConfirmed == true)
                {
                    return Ok("Giriş Başarılı.");
                }
                
            }
            else
            {
                return BadRequest("Şifre ve ya Kullanıcı Adı Yanlış.");
            }
            return View();
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
                else
                {
                    foreach (var item in result.Errors)
                    {
                        ModelState.AddModelError("", item.Description);
                    }
                }
            }
            return View();
        }

    }
}
