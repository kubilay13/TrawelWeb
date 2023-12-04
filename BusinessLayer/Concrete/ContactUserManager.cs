using BusinessLayer.Abstract;
using DataAccsessLayer.Abstract;
using Entity;

namespace BusinessLayer.Concrete
{
    public class ContactUserManager : IContactUserService
    {
        private readonly IContactUserDal _contactUserDal;

        public ContactUserManager(IContactUserDal contactUserDal)
        {
            _contactUserDal = contactUserDal;
        }

        public void TDelete(ContactUser t)
        {
            _contactUserDal.Delete(t);
        }

        public List<ContactUser> TGetAll()
        {
            return _contactUserDal.GetAll();
        }

        public ContactUser TGetByID(int id)
        {
            return _contactUserDal.GetByID(id);
        }

        public void TInsert(ContactUser t)
        {
            _contactUserDal.Insert(t);
        }

        public void TUpdate(ContactUser t)
        {
            _contactUserDal.Update(t);
        }
    }
}
