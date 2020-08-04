using Microsoft.EntityFrameworkCore.Migrations;

namespace CurtainShop.API.Migrations
{
    public partial class AddedRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Room",
                table: "Curtains",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Room",
                table: "Curtains");
        }
    }
}
