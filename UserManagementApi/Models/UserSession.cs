using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagementApi.Models
{
    public class UserSession
    {
        public string UserName { get; set; }
        public string UserRole { get; set; }
        public string UserToken { get; set; }

        public UserSession (string _userName, string _userRole, string _userToken) {
          UserName = _userName;
            UserRole = _userRole;
            UserToken = _userToken;
       }
    }
}
