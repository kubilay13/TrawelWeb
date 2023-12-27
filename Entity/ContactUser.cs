namespace Entity
{
    public class ContactUser : BaseEntity
    {
        public enum Type
        {
            Success,
            Failure
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public Type Status { get; set; }
    }
}
