using Entity;

namespace DTOLayer.Dtos.OrderDtos
{
    public class OrderDtos
    {
        public string Brand { get; set; } //Araç Markası
        public string Model { get; set; } //Model
        public int Year { get; set; }  //Yılı
        public string Color { get; set; } //Renk
        public int ModaretorId { get; set; }//Hangi kullanıcının eklediğiyse
        public Cars Cars { get; set; }
    }
}
