using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPi.Migrations
{
    public partial class CascadeDeleteDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Details_Masters_OrderId",
                table: "Details");

            migrationBuilder.AddForeignKey(
                name: "FK_Details_Masters_OrderId",
                table: "Details",
                column: "OrderId",
                principalTable: "Masters",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Details_Masters_OrderId",
                table: "Details");

            migrationBuilder.AddForeignKey(
                name: "FK_Details_Masters_OrderId",
                table: "Details",
                column: "OrderId",
                principalTable: "Masters",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
