using Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

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
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderCategory> OrderCategory { get; set; }
        public DbSet<Photo> Photo { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<OrderCategory>()
            .HasKey(oc => new { oc.OrderId, oc.ProductId }); // Anahtar olarak OrderId ve CategoryId kullan

            // Rollerinizi burada ekleyin
            builder.Entity<AppRole>().HasData(
                new AppRole { Id = 1, Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = Guid.NewGuid().ToString() },
                new AppRole { Id = 2, Name = "Moderator", NormalizedName = "MODERATOR", ConcurrencyStamp = Guid.NewGuid().ToString() },
                new AppRole { Id = 3, Name = "User", NormalizedName = "USER", ConcurrencyStamp = Guid.NewGuid().ToString() }
            );
        }
    }
}
