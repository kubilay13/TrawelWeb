using static Entity.Order;

namespace Entity
{
    public class OrderCategory
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }//Araba Tekne id
        public CategoryType Type { get; set; }//1==Car +  Sonradan gelenler 2 3 diye eklenicek.+ Ekleme Admin tarafından yapılacak.

    }
}
