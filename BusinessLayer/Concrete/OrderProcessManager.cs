using BusinessLayer.Abstract;
using Entity;

namespace BusinessLayer.Concrete
{
    public class OrderProcessManager:IOrderService
    {
        private readonly IOrderService _orderService;

        public OrderProcessManager(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public void TDelete(Order t)
        {
            _orderService.TDelete(t);
        }

        public List<Order> TGetAll()
        {
           return _orderService.TGetAll();
        }

        public Order TGetByID(int id)
        {
           return _orderService.TGetByID(id);
        }

        public void TInsert(Order t)
        {
           _orderService.TInsert(t);
        }

        public void TUpdate(Order t)
        {
            _orderService.TUpdate(t);
        }
    }
}
