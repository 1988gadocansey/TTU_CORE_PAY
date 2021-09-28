using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularAndNetCoreAuth.Migrations
{
    public partial class _102 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcceptPayment",
                table: "Product");

            migrationBuilder.AddColumn<bool>(
                name: "AcceptPartPayment",
                table: "Product",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Product",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcceptPartPayment",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Product");

            migrationBuilder.AddColumn<bool>(
                name: "AcceptPayment",
                table: "Product",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
