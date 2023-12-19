using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccsessLayer.Migrations
{
    /// <inheritdoc />
    public partial class OrderCategoryType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderCategory",
                table: "OrderCategory");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "OrderCategory");

            migrationBuilder.DropColumn(
                name: "CategoryType",
                table: "OrderCategory");

            migrationBuilder.DropColumn(
                name: "OrderCategoryId",
                table: "Order");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderCategory",
                table: "OrderCategory",
                columns: new[] { "OrderId", "ProductId" });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "8cad8443-8f47-49c4-96b1-a75ed7a948ba");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "551dda4a-b8ce-45e9-948e-bb83395d407f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "dd81da41-2b0b-46a0-a938-e8349b6583e4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderCategory",
                table: "OrderCategory");

            migrationBuilder.AddColumn<int>(
                name: "ID",
                table: "OrderCategory",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "CategoryType",
                table: "OrderCategory",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrderCategoryId",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderCategory",
                table: "OrderCategory",
                column: "ID");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "2e794f28-6b5f-4bd9-b637-30e1e0807cc2");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "2a425665-de98-4aa2-bfdb-7b22cc15d2b5");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "7ac57a4b-1fdc-4879-93de-c8e15dcbcb06");
        }
    }
}
