using Microsoft.EntityFrameworkCore.Migrations;

namespace CurtainShop.API.Migrations
{
    public partial class Initialize2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Photos");

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Curtains",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "public_id",
                table: "Curtains",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "public_id",
                table: "Curtains");

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Photos",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
