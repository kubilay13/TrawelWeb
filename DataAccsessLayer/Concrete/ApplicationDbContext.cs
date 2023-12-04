using Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccsessLayer.Concrete
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\mssqllocaldb;Database=TrawelWeb;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        // Tablo Modelleri

        public DbSet<Cars> Cars { get; set; }
        public DbSet<ContactUser> ContactUsers { get; set; }


    }
}
