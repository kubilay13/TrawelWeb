using BusinessLayer.Abstract;
using DataAccsessLayer.Abstract;
using Entity;

namespace BusinessLayer.Concrete
{
    public class AppUserManager : IAppUserService
    {
        private readonly IAppUserDal _userDal;

        public AppUserManager(IAppUserDal userDal)
        {
            _userDal = userDal;
        }

        public void TDelete(AppUser t)
        {
            _userDal.Delete(t);
        }

        public List<AppUser> TGetAll()
        {
            return _userDal.GetAll();
        }

        public AppUser TGetByID(int id)
        {
            return _userDal.GetByID(id);
        }

        public void TInsert(AppUser t)
        {
            _userDal.Insert(t);
        }

        public void TUpdate(AppUser t)
        {
            _userDal.Update(t);
        }
    }
}
