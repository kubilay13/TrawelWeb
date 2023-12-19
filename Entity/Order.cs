namespace Entity
{
    public class Order : BaseEntity
    {
        public enum CategoryType
        {
            Car,
            Boat,
            // Diğer değerler...
        }
        public string Brand { get; set; } //Araç Markası
        public string Model { get; set; } //Model
        public int Year { get; set; }  //Yılı
        public string Color { get; set; } //Renk
        public int ModaretorId { get; set; }//Hangi kullanıcının eklediğiyse
        public CategoryType Type { get; set; }//1==Car +  Sonradan gelenler 2 3 diye eklenicek.+ Ekleme Admin tarafından yapılacak.
    }
}
