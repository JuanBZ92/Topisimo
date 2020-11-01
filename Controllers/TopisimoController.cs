using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using Topisimo.DTO;
using Topisimo.Models;

namespace Topisimo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopisimoController : ControllerBase
    {
        private readonly TopisimoDbContext _context;
        private readonly NotificationMetadata _notificationMetadata;

        public TopisimoController(TopisimoDbContext context, NotificationMetadata notificationMetadata)
        {
            _context = context;
            _notificationMetadata = notificationMetadata;
        }

        // GET: api/Topisimo3
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pedidos>>> GetPedidos()
        {
            return await _context.Pedidos.ToListAsync();
        }

        [HttpGet("estadisticas")]
        public async Task<ActionResult<IEnumerable<Estadisticas>>> GetEstadisticas()
        {
            var modelobjlist = from p in _context.Pedidos
                               select new Estadisticas
                               {
                                   Id = p.Id,
                                   Modelo = p.Modelo,
                                   Ganancia = p.Precio - ((p.Costo * p.Peso) / 100)
                               };

            var result = await modelobjlist.ToArrayAsync();
            return Ok(result);
        }

        [HttpGet("datos")]
        public async Task<ActionResult<IEnumerable<DatosCliente>>> GetDatosClientes()
        {
            return await _context.DatosCliente.ToListAsync();
        }

        [HttpGet("productos/{categoria}")]
        public async Task<ActionResult<IEnumerable<Productos>>> GetProductos(Categoria categoria)
        {
            var productos = await _context.Productos.Where(x => x.Categoria.Equals(categoria)).ToListAsync();
            IList<ProductosDTO> productosDTOList = new List<ProductosDTO>();
            foreach (Productos pr in productos)
            {
                ProductosDTO productosDTO = new ProductosDTO();
                productosDTO.Anio = pr.Anio;
                productosDTO.Categoria = pr.Categoria;
                productosDTO.Conjunto = pr.Conjunto;
                productosDTO.Modelo = pr.Modelo;
                productosDTO.Path = pr.Path;
                string[] dirFiles;
                var dir = Directory.GetCurrentDirectory();
                if (Directory.Exists(dir + pr.Path + @"\" + pr.Modelo.Replace(" ", string.Empty)))
                {
                    dirFiles = Directory.GetFiles(dir + pr.Path + @"\" + pr.Modelo.Replace(" ", string.Empty));
                } else
                {
                    Directory.CreateDirectory(dir + pr.Path + @"\" + pr.Modelo.Replace(" ", string.Empty));
                    dirFiles = Directory.GetFiles(dir + pr.Path + @"\" + pr.Modelo.Replace(" ", string.Empty));
                }
                productosDTO.ImagePaths = dirFiles;

                productosDTOList.Add(productosDTO);
            }
            return Ok(productosDTOList);
        }

        // GET: api/Topisimo3/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pedidos>> GetPedidos(int id)
        {
            var pedidos = await _context.Pedidos.FindAsync(id);

            if (pedidos == null)
            {
                return NotFound();
            }

            return pedidos;
        }

        // PUT: api/Topisimo3/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPedidos(int id, Pedidos pedidos)
        {
            if (id != pedidos.Id)
            {
                return BadRequest();
            }

            _context.Entry(pedidos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Topisimo3
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Pedidos>> PostPedidos(Pedidos pedidos)
        {
            _context.Pedidos.Add(pedidos);
            Estadisticas estadisticas = new Estadisticas
            {
                Id = 0,
                PedidosId = pedidos.Id,
                Ganancia = pedidos.Precio - ((pedidos.Costo * pedidos.Peso) / 100),
                Modelo = pedidos.Modelo,
            };
            _context.Estadisticas.Add(estadisticas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPedidos", new { id = pedidos.Id }, pedidos);
        }

        [HttpPost("sendemail")]
        public async Task SendEmail(QuieroProducto quiero)
        {
            EmailMessage message = new EmailMessage();
            message.Content = "Hola, soy " + quiero.Nombre + ", me interesa el modelo " + quiero.Modelo + " " + quiero.Anio + " con las medidas : " + quiero.Talle + " / " + quiero.Taza + ". Mi contacto es : " + quiero.Email + " / " + quiero.Telefono;
            message.Reciever = new MailboxAddress("Self", _notificationMetadata.Reciever); ;
            message.Sender = new MailboxAddress("Self", _notificationMetadata.Sender); ;
            message.Subject = "Quiero el modelo " + quiero.Modelo + " " + quiero.Anio;

            var mimeMessage = CreateMimeMessageFromEmailMessage(message);

            using (SmtpClient smtpClient = new SmtpClient())
            {
                await smtpClient.ConnectAsync(_notificationMetadata.SmtpServer,
                _notificationMetadata.Port, true);
                await smtpClient.AuthenticateAsync(_notificationMetadata.UserName,
                _notificationMetadata.Password);
                await smtpClient.SendAsync(mimeMessage);
                await smtpClient.DisconnectAsync(true);
            }
        }

        private MimeMessage CreateMimeMessageFromEmailMessage(EmailMessage message)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(message.Sender);
            mimeMessage.To.Add(message.Reciever);
            mimeMessage.Subject = message.Subject;
            mimeMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            { Text = message.Content };
            return mimeMessage;
        }

        // DELETE: api/Topisimo3/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Pedidos>> DeletePedidos(int id)
        {
            var pedidos = await _context.Pedidos.FindAsync(id);
            if (pedidos == null)
            {
                return NotFound();
            }

            _context.Pedidos.Remove(pedidos);
            await _context.SaveChangesAsync();

            return pedidos;
        }

        private bool PedidosExists(int id)
        {
            return _context.Pedidos.Any(e => e.Id == id);
        }
    }
}
