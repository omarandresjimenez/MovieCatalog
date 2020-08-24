using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using UserManagementApi.Models;

namespace UserManagementApi.utils
{
  public class Security
  {
    public Security()
    {
    }

    public static  string generateJwtToken(UserItem user, String secretKey)
    {

      // generate token that is valid for 1 day
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(secretKey);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[] { new Claim("id", user.userName) }),
        Expires = DateTime.UtcNow.AddDays(1),
        //Expires = DateTime.UtcNow.AddSeconds(20),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}
