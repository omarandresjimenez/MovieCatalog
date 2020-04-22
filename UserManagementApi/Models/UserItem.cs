using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagementApi.Models
{
    public class UserItem
    {
        [Key]
        [Column(TypeName = "nvarchar(100)")]
        public string userName { get; set; }
        
        [Column(TypeName = "nvarchar(512)")]
        public string userPassword { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(20)")]
        public string userRole { get; set; }
    }
}
