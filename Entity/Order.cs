namespace Entity
{
    public class Order : BaseEntity
    {
        public string Brand { get; set; } //Araç Markası
        public string Model { get; set; } //Model
        public int Year { get; set; }  //Yılı
        public string Color { get; set; } //Renk
        public int ModaretorId { get; set; }//Hangi kullanıcının eklediğiyse
        public int OrderTypeId { get; set; }//1 ise araba 
        public int CarId { get; set; }//İlan eklerken beraberinde eklenilecek arabanın idsi
    }
}
