using BusinessLayer.Abstract;
using DataAccsessLayer.Abstract;
using Entity;

namespace BusinessLayer.Concrete
{
    public class CarsManager : ICarsService
    {
        private readonly ICarsDal _carsDal;

        public CarsManager(ICarsDal carsDal)
        {
            _carsDal = carsDal;
        }

        public void TDelete(Cars t)
        {
            _carsDal.Delete(t);
        }

        public List<Cars> TGetAll()
        {
            return _carsDal.GetAll();
        }

        public Cars TGetByID(int id)
        {
            return _carsDal.GetByID(id);
        }

        public void TInsert(Cars t)
        {
            _carsDal.Insert(t);
        }

        public void TUpdate(Cars t)
        {
            _carsDal.Update(t);
        }
    }
}
