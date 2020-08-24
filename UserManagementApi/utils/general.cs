using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using UserManagementApi.Models;

namespace UserManagementApi.utils
{
    public class general
    {    
      public void LogAction(ActionLog action)
       {
            // Set the file path
           // string path = "c:\\temp\\actionlog.txt";

            // Add the text message to the file
            //System.IO.File.AppendAllText(path, $"{DateTime.Now.ToString("o")}  {action}" + Environment.NewLine);
            //System.IO.File.AppendAllText(path, $"Date: {action.dateAction}" + Environment.NewLine  +
            //                                   $"User Affected: {action.userUpdatedAction}" + Environment.NewLine +
            //                                   $"Type: {action.typeAction}" + Environment.NewLine +
            //                                   $"Fields: {action.detailAction}" + Environment.NewLine + Environment.NewLine);

        }

    }
}
