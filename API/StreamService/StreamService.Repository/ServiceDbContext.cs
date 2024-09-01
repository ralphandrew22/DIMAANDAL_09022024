using Microsoft.EntityFrameworkCore;
using StreamService.Entities;

namespace StreamService.Repository
{
    public class ServiceDbContext: DbContext
    {
        public virtual DbSet<VideoCategory> VideoCategories { get; set; }
        public virtual DbSet<VideoFile> VideoFiles { get; set; }

        public ServiceDbContext(DbContextOptions<ServiceDbContext> options)
    : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=127.0.0.1,1433;Initial Catalog=StreamService;Persist Security Info=False;User ID=SA;Password=StreamServiceDemo2022;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;");
        }
    }
}
