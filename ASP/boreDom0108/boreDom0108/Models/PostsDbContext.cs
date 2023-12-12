using Microsoft.EntityFrameworkCore;

namespace boreDom0108.Models
{
    public class PostsDbContext : DbContext
    {
        public PostsDbContext(DbContextOptions<PostsDbContext> options) : base(options)
        {
        }

        public DbSet<Posts> Posts { get; set; } 
        public DbSet<Categories> Categories { get; set; } 


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string conn = "server=127.0.0.1; database=boreDomPosts; user=root; password=";

                optionsBuilder.UseMySql(conn, ServerVersion.AutoDetect(conn));
            }
        }
    }
}
