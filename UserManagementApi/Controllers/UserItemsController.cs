using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using UserManagementApi.Models;
using UserManagementApi.utils;

namespace UserManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserItemsController : ControllerBase
    {
        private readonly UserContext _context;

        public UserItemsController(UserContext context)
        {
            _context = context;
        }

        // GET: api/UserItems
        [HttpGet]
        public  IEnumerable<UserSession> GetUserItems()
        {
          
          var users = _context.UserItems
                       .Select(x => new UserSession(x.userName, x.userRole, "1"));
            return users.ToArray();
        }

        // GET: api/UserItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserItem>> GetUserItem(string id)
        {
            var userItem = await _context.UserItems.FindAsync(id);

            if (userItem == null)
            {
                return NotFound();
            }

            return userItem;
        }

        // PUT: api/UserItems/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        //only update Role
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserItem(string id, UserItem userItem)
        {
           
            if (id != userItem.userName)
            {
                return BadRequest();
            }


            var userp = _context.UserItems
                      .Where(x => x.userName == id)
                      .Select(x => x.userPassword);


            userItem.userPassword = userp.FirstOrDefault(); // lets assign same current password
            _context.Entry(userItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                this.logAction("update", userItem.userName, "User Updated");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(true);
        }

        // POST: api/UserItems
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UserItem>> PostUserItem(UserItem userItem)
        {
            var message = userItem.userPassword;

            var salt = "10";  // just for sample
            var hash = Hash.Create(message, salt);
            userItem.userPassword = hash;
            _context.UserItems.Add(userItem);
            try
            {
                await _context.SaveChangesAsync();
                this.logAction("add", userItem.userName, "New User Created" );
            }
            catch (DbUpdateException)
            {
                if (UserItemExists(userItem.userName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(true);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public  ActionResult<string> Authenticate([FromBody]UserLogin userdata)
        {
            var message = userdata.UserPassword;

            var user = _context.UserItems.Find(userdata.UserName);
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var salt = "10";
            var hash = user.userPassword;
            var match = false;
            try
            {
                match =  Hash.Validate(message, salt, hash);
            }
            catch (DbUpdateException)
            {
                throw;
            }

            if (match)
            {
                this.logAction("Log In", userdata.UserName, "Logged in succesfully");
                var session = new UserSession(user.userName, user.userRole, "JWT_user");
                // session.UserToken = "JWT_user"; // generateTokenUser();
                return Ok(session);
            }
            else {
                this.logAction("Log In", userdata.UserName, "Logged in failed due invalid credentials");
                return BadRequest(new { message = "Username or password is incorrect" });
                
            }
        }


        // DELETE: api/UserItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserItem>> DeleteUserItem(string id)
        {
            var userItem = await _context.UserItems.FindAsync(id);
            if (userItem == null)
            {
                return NotFound();
            }

            _context.UserItems.Remove(userItem);
            await _context.SaveChangesAsync();
            this.logAction("Delete", id, "User removed");
            return Ok(true);
        }

        private bool UserItemExists(string id)
        {
            return _context.UserItems.Any(e => e.userName == id);
        }

        private void logAction(string type, string user, string text)
        {
            var action = new ActionLog();
            action.dateAction = DateTime.Now.ToString("o");
            action.typeAction = type;
            action.userUpdatedAction = user;
            action.detailAction = text;
            new general().LogAction(action);
        }
    }
}
