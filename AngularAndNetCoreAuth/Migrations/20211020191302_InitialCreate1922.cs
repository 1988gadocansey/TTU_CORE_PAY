using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularAndNetCoreAuth.Migrations
{
    public partial class InitialCreate1922 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Level",
                table: "Payment",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "Payment");
        }
    }
}
