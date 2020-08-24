using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UserManagementApi.Models;

namespace UserManagementApi.services
{
  public class userService
  {
    public userService()
    {
    }

    public async static Task<ActionResult<UserItem>> getUserById(UserContext _context, String id) {
      var userItem =  await _context.UserItems.FindAsync(id);
      return userItem;
    }

  }
}
