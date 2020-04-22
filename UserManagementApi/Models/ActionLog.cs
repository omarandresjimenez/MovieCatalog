using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagementApi.Models
{
    public class ActionLog
    {
        public string dateAction { get; set; }
        public string typeAction { get; set; }
        public string userUpdatedAction { get; set; }
        public string detailAction { get; set; }
    }
}
