namespace Entity
{
    public class UserOrder : BaseEntity
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
