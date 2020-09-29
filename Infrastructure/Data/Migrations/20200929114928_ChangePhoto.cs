using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class ChangePhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "ProductPhotos",
                newName: "Id");

            migrationBuilder.AddColumn<bool>(
                name: "MainPhoto",
                table: "ProductPhotos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainPhoto",
                table: "ProductPhotos");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductPhotos",
                newName: "id");
        }
    }
}
