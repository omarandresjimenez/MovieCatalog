using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagementApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserItems",
                columns: table => new
                {
                    userName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    userPassword = table.Column<string>(type: "nvarchar(512)", nullable: false),
                    userRole = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserItems", x => x.userName);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserItems");
        }
    }
}
