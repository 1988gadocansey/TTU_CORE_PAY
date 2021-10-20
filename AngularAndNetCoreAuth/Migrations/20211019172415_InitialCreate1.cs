using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularAndNetCoreAuth.Migrations
{
    public partial class InitialCreate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Student_studentId",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_studentId",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "studentId",
                table: "Payment");

            migrationBuilder.AddColumn<string>(
                name: "Indexno",
                table: "Payment",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Payment",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Indexno",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Payment");

            migrationBuilder.AddColumn<Guid>(
                name: "studentId",
                table: "Payment",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payment_studentId",
                table: "Payment",
                column: "studentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Student_studentId",
                table: "Payment",
                column: "studentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
