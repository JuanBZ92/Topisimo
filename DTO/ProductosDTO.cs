using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Topisimo.Models;

namespace Topisimo.DTO
{
    public class ProductosDTO
    {
        public string Modelo { get; set; }
        public string Path { get; set; }
        public int Anio { get; set; }
        public int Partes { get; set; }
        public bool Conjunto { get; set; }
        public Categoria Categoria { get; set; }
        public IList<string> ImagePaths { get; set; }
    }
}
