using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Topisimo.Models
{
    public class DatosCliente
    {
        [Key]
        public int Id { get; set; }
        public string Instagram { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }

        [ForeignKey("Clientes")]
        public string Cliente { get; set; }
        public virtual Clientes Clientes { get; set; }
    }
}
