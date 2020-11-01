using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Topisimo.Models
{
    public class Estadisticas
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Pedidos")]
        public int PedidosId { get; set; }
        public string Modelo { get; set; }
        public double Ganancia { get; set; }

        public virtual Pedidos Pedidos { get; set; }
    }
}
