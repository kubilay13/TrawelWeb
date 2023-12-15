using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Entity;

namespace TrawelWeb
{
    public class SessionFilter : IAsyncActionFilter
    {
        private readonly UserManager<AppUser> _userManager;
        public SessionFilter(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var userId = _userManager.GetUserId(context.HttpContext.User);

            if (userId == null)
            {
                context.Result = new RedirectResult("/Login/Index/");
                return;
            }

            // Action'ı devam ettir
            var resultContext = await next();
        }
 
    }
}
