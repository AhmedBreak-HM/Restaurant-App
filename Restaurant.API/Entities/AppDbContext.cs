using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Entities
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Customer> Customeres { get; set; }
        public DbSet<Item> Itemes { get; set; }
        public DbSet<OrderMaster> Masters { get; set; }
        public DbSet<OrderDetails> Details { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderMaster>()
                .HasMany(p => p.OrderDetails)
                .WithOne(b => b.OrderMaster)
                .OnDelete(DeleteBehavior.Cascade);
        }
        
    }
}
