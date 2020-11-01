using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Topisimo.Models
{
    public class TopisimoDbContext : DbContext
    {
        public TopisimoDbContext(DbContextOptions<TopisimoDbContext> options)
            : base(options)
        { }
        public DbSet<DatosCliente> DatosCliente { get; set; }
        public DbSet<Pedidos> Pedidos { get; set; }
        public DbSet<Estadisticas> Estadisticas { get; set; }
        public DbSet<Estadisticas> Clientes { get; set; }
        public DbSet<Productos> Productos { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseMySQL();
        //}

    }

}
