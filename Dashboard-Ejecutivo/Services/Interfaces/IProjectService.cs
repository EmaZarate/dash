using Dashboard_Ejecutivo.Data.Models;
using Dashboard_Ejecutivo.DataDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Interfaces
{
  public interface IProjectService
  {
    List<ProjectDTO> GetAll(int enviroment);
    bool InsertOrUpdateProject(Dictionary<string, object> dicProject);
    bool InsertOrUpdateProject(List<Dictionary<string, object>> listDicProject);
    ProjectDTO GetProjectById(int id);
    List<ProjectStateDTO> GetAllProjectStatusById(int id);   
    bool PublishProject(List<string> listGuidProject);
    List<ProjectNameDTO> GetAllProjectName(int enviroment);
    int Add();
    bool Update(ProjectDTO project);
    bool DeleteProject(int id);
  }
}
