using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularAndNetCoreAuth.Migrations
{
    public partial class InitialCreate112 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Product_productId",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_productId",
                table: "Payment");

            migrationBuilder.RenameColumn(
                name: "productId",
                table: "Payment",
                newName: "ProductId");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "Payment",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Payment",
                newName: "productId");

            migrationBuilder.AlterColumn<Guid>(
                name: "productId",
                table: "Payment",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateIndex(
                name: "IX_Payment_productId",
                table: "Payment",
                column: "productId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Product_productId",
                table: "Payment",
                column: "productId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
