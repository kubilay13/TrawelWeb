using BusinessLayer.Abstract;
using Entity;

namespace BusinessLayer.Concrete
{
    public class AppUserProcessManager : IAppUserService
    {
        private readonly IAppUserService _userService;

        public AppUserProcessManager(IAppUserService userService)
        {
            _userService = userService;
        }

        public void TDelete(AppUser t)
        {
            _userService.TDelete(t);
        }

        public List<AppUser> TGetAll()
        {
            return _userService.TGetAll();
        }

        public AppUser TGetByID(int id)
        {
            return _userService.TGetByID(id);
        }

        public void TInsert(AppUser t)
        {
            _userService.TInsert(t);
        }

        public void TUpdate(AppUser t)
        {
            _userService.TUpdate(t);
        }
    }
}
