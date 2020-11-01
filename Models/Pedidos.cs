using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Topisimo.Models
{
    public class Pedidos
    {
        [Key]
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Cliente { get; set; }
        public string Modelo { get; set; }
        public string Color { get; set; }
        public double Peso { get; set; }
        public double Costo { get; set; }
        public int Busto { get; set; }
        public int BajoBusto { get; set; }
        public int Tasa { get; set; }
        public int Cintura { get; set; }
        public double Precio { get; set; }
        public Estado Estado { get; set; }
        public string Notas { get; set; }
    }

    public enum Estado
    {
        EnProgreso = 0,
        Hecho = 1,
        Enviado = 2,
        Recibido = 3
    }
}
