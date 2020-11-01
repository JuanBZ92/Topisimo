using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Topisimo.Models
{
    public class Productos
    {
        [Key]
        public string Modelo { get; set; }
        public string Path { get; set; }
        public int Anio { get; set; }
        public int Partes { get; set; }
        public bool Conjunto { get; set; }
        public Categoria Categoria { get; set; }
    }

    public enum Categoria
    {
        Temporada = 0,
        Promociones = 1,
        Accesorios = 2
    }
}
