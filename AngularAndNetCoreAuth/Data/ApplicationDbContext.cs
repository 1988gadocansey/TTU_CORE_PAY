using AngularAndNetCoreAuth.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndNetCoreAuth.Data
{
    ///Create your application database context. This class stands at the center of EF core.
    ///Check here: https://www.entityframeworktutorial.net/efcore/entity-framework-core-migration.aspx for adding migrations and updating Database
    ///I ended up using CLI for all my EF transactions. Package manager console was becoming a pain.
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

         
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.UseSerialColumns();
            modelBuilder.Entity<UserData>().Property(x => x.Id);
            modelBuilder.Entity<Student>().Property(x => x.Id);
            modelBuilder.Entity<Product>().Property(x => x.Id);
            modelBuilder.Entity<Payment>().Property(x => x.Id);
            
            
        }
        

        public DbSet<UserData> UserData { get; set; }
        public DbSet<Payment> Payment{ get; set; }
        public DbSet<Product> Product{ get; set; }
        public DbSet<Student> Student{ get; set; }
         

    }


}
