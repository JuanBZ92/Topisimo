using Microsoft.EntityFrameworkCore.Migrations;

namespace Topisimo.Migrations
{
    public partial class DescriptionProductos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Productos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Productos");
        }
    }
}
