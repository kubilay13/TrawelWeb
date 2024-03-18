using Microsoft.AspNetCore.Identity;

namespace Entity
{
    public class AppUser : IdentityUser<int>
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Adress { get; set; }
        //public string Email { get; set; }
        public int ConfirmCode { get; set; }

    }
}
