using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPi.Migrations
{
    public partial class CreateDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customeres",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customeres", x => x.CustomerId);
                });

            migrationBuilder.CreateTable(
                name: "Itemes",
                columns: table => new
                {
                    ItemId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ItemPrice = table.Column<decimal>(type: "decimal(18, 2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Itemes", x => x.ItemId);
                });

            migrationBuilder.CreateTable(
                name: "Masters",
                columns: table => new
                {
                    OrderId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderNo = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CustomerId = table.Column<int>(nullable: true),
                    Pmethod = table.Column<string>(nullable: true),
                    Gtotal = table.Column<decimal>(type: "decimal(18, 2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Masters", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Masters_Customeres_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customeres",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Details",
                columns: table => new
                {
                    DetailsId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<long>(nullable: true),
                    ItemId = table.Column<int>(nullable: true),
                    DetailsQuantity = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Details", x => x.DetailsId);
                    table.ForeignKey(
                        name: "FK_Details_Itemes_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Itemes",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Details_Masters_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Masters",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Details_ItemId",
                table: "Details",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Details_OrderId",
                table: "Details",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Masters_CustomerId",
                table: "Masters",
                column: "CustomerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Details");

            migrationBuilder.DropTable(
                name: "Itemes");

            migrationBuilder.DropTable(
                name: "Masters");

            migrationBuilder.DropTable(
                name: "Customeres");
        }
    }
}
