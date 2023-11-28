

namespace Entity
{
    public class Cars : BaseEntity
    {
        public string Brand { get; set; } //Araç Markası
        public string Model { get; set; } //Model
        public int Year { get; set; }  //Yılı
        public string FuelType { get; set; } //Yakıt Tipi
        public string GearType {  get; set; } //Vites Tipi
        public int KM {  get; set; } //KM
        public string CaseType {  get; set; } //Kasa Tipi
        public int EnginePower { get; set; } //Motor Gücü
        public int EngineCapacity { get; set; } //Motor Hacmi
        public string Color { get; set; } //Renk
    }
}
