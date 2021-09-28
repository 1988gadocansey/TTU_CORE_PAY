using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularAndNetCoreAuth.Migrations
{
    public partial class _103 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StateDate",
                table: "Product");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Product",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Product");

            migrationBuilder.AddColumn<DateTime>(
                name: "StateDate",
                table: "Product",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
