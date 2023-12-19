using static Entity.Order;

namespace TrawelWeb.Models
{
    public class CarsViewModel
    {
        public string Brand { get; set; } //Araç Markası
        public string Model { get; set; } //Model
        public int Year { get; set; }  //Yılı
        public string FuelType { get; set; } //Yakıt Tipi
        public string GearType { get; set; } //Vites Tipi
        public int KM { get; set; } //KM
        public string CaseType { get; set; } //Kasa Tipi
        public int EnginePower { get; set; } //Motor Gücü
        public int EngineCapacity { get; set; } //Motor Hacmi
        public string Color { get; set; } //Renk
        public int ModaretorId { get; set; }//Hangi kullanıcının eklediğiyse
        public CategoryType Type { get; set; }//1==Car +  Sonradan gelenler 2 3 diye eklenicek.+ Ekleme Admin tarafından yapılacak.

    }
}
