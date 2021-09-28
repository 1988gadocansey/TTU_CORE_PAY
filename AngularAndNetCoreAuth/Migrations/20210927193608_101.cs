using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularAndNetCoreAuth.Migrations
{
    public partial class _101 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Payment");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Student",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductId",
                table: "Payment",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentId",
                table: "Payment",
                type: "text",
                nullable: true);
        }
    }
}
