using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularAndNetCoreAuth.Migrations
{
    public partial class InitialCreate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TransactionId",
                table: "Payment",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "TransactionId",
                table: "Payment",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
