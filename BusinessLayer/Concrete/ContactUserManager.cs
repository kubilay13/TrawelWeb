using BusinessLayer.Abstract;
using DataAccsessLayer.Abstract;
using Entity;

namespace BusinessLayer.Concrete
{
    public class ContactUserManager : IContactUserService
    {
        private readonly IContactUserDal _contactUserDal;
       
        public void TDelete(ContactUser t)
        {
            throw new NotImplementedException();
        }

        public List<ContactUser> TGetAll()
        {
            throw new NotImplementedException();
        }

        public ContactUser TGetByID(int id)
        {
            throw new NotImplementedException();
        }

        public void TInsert(ContactUser t)
        {
            throw new NotImplementedException();
        }

        public void TUpdate(ContactUser t)
        {
            throw new NotImplementedException();
        }
    }
}
