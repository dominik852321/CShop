using Microsoft.EntityFrameworkCore.Migrations;

namespace CurtainShop.API.Migrations
{
    public partial class AddTableCloth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TableClothId",
                table: "Photos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TableClothId",
                table: "Photos");
        }
    }
}
