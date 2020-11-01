using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Topisimo.Models
{
    public class Clientes
    {
        [Key]
        public string Nombre { get; set; }
    }
}
