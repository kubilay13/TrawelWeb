using BusinessLayer.Abstract;
using Entity;

namespace BusinessLayer.Concrete
{
    public class CarsProcessManager : ICarsService
    {
        private readonly ICarsService _carsService;

        public CarsProcessManager(ICarsService carsService)
        {
            _carsService = carsService;
        }

        public void TDelete(Cars t)
        {
           _carsService.TDelete(t);
        }

        public List<Cars> TGetAll()
        {
           return _carsService.TGetAll();
        }

        public Cars TGetByID(int id)
        {
           return _carsService.TGetByID(id);
        }

        public void TInsert(Cars t)
        {
           _carsService.TInsert(t);
        }

        public void TUpdate(Cars t)
        {
           _carsService.TUpdate(t);
        }
    }
}
