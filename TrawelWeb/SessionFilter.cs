using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Entity;

namespace TrawelWeb
{
    public class SessionFilter : IActionFilter
    {
        private readonly UserManager<AppUser> _userManager;

        public SessionFilter(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async void OnActionExecuting(ActionExecutingContext context)
        {
            var userId = _userManager.GetUserId(context.HttpContext.User);

            if (userId == null)
            {
                context.Result = new RedirectResult("/Login/Index");
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Action çalıştırıldıktan sonra yapılacak işlemler
        }
    }
}
