using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CurtainShop.API.Migrations
{
    public partial class Initialize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Curtains",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    Width = table.Column<int>(nullable: false),
                    StickOn = table.Column<string>(nullable: true),
                    Color1 = table.Column<string>(nullable: true),
                    Color2 = table.Column<string>(nullable: true),
                    Material1 = table.Column<string>(nullable: true),
                    Material2 = table.Column<string>(nullable: true),
                    Material3 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curtains", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    IsMain = table.Column<bool>(nullable: false),
                    CurtainId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Photos_Curtains_CurtainId",
                        column: x => x.CurtainId,
                        principalTable: "Curtains",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CurtainId",
                table: "Photos",
                column: "CurtainId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "Curtains");
        }
    }
}
