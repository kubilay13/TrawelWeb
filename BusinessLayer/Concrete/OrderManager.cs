using BusinessLayer.Abstract;
using DataAccsessLayer.Abstract;
using Entity;

namespace BusinessLayer.Concrete
{
    public class OrderManager : IOrderService
    {
        private readonly IOrderDal _orderDal;

        public OrderManager(IOrderDal orderDal)
        {
            _orderDal = orderDal;
        }

        public void TDelete(Order t)
        {
            _orderDal.Delete(t);
        }

        public List<Order> TGetAll()
        {
            return _orderDal.GetAll();
        }

        public Order TGetByID(int id)
        {
            return _orderDal.GetByID(id);
        }

        public void TInsert(Order t)
        {
            _orderDal.Insert(t);
        }

        public void TUpdate(Order t)
        {
            _orderDal.Update(t);
        }
    }
}
