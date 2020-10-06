using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharepointPWA
{
    public interface IServicesPWA
    {
        List<Dictionary<string, object>> GetAllProjects();
        Dictionary<string, object> GetProjectById(string id);
    }
}
