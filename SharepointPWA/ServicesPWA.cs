using Microsoft.SharePoint.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace SharepointPWA
{
    public class ServicesPWA : IServicesPWA
    {
        //https://sancristobalsmsg.sharepoint.com/sites/pwa/_api/ProjectData/[en-us]/
        //https://mstech720.sharepoint.com/sites/pwa/_api/ProjectData/[en-us]/
        //User MsTech@sancristobal.com.ar
        //Password I6e2oPm2

        private readonly static string Base_SharePointUrl = "https://sancristobalsmsg.sharepoint.com";
        private readonly static string SharePointPWAUrl= "https://sancristobalsmsg.sharepoint.com/sites/pwa/_api/ProjectData/[en-us]/";
        private readonly static string UserPWA = "MsTech@sancristobal.com.ar";

        private QueryPwa queryPwa = new QueryPwa();

        public List<Dictionary<string, object>> GetAllProjects()
        {
            try
            {
                
                Dictionary<string, object> dicProjectDetail = null;

                string response = SetRequestResponseRequest(queryPwa.GetAllProjects);
                Dictionary<string, object> dicProjectWebApp = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);                
                List<Dictionary<string, object>> listDic =  JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectWebApp["value"].ToString()).ToString());

                //GetRiskOfProject(ref listDic,ref dicProjectDetail);
                //GetIssuesOfProject(ref listDic,ref dicProjectDetail);
                //GetTaskOfProject(ref listDic,ref dicProjectDetail);
                //GetTeamOfProject(ref listDic, ref dicProjectDetail);

            
                return listDic;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public Dictionary<string, object>  GetProjectById(string id)
        {
            try
            {
                List<Dictionary<string, object>> listDic = null;

                string response = SetRequestResponseRequest(queryPwa.GetProjectByID(id));
                Dictionary<string, object> dicProjectDetail = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);

                GetRiskOfProject(ref listDic, ref dicProjectDetail);
                GetIssuesOfProject(ref listDic, ref dicProjectDetail);
                GetTaskOfProject(ref listDic,ref dicProjectDetail);
                GetTeamOfProject(ref listDic, ref dicProjectDetail);

                return dicProjectDetail;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        
        private  SecureString GenerateSecurePassword()
        {
            try
            {
                var securePassword = new SecureString();
                //I6e2oPm2
                    //L30nard03024
                foreach (char c in "I6e2oPm2")
                {
                    securePassword.AppendChar(c);
                }

                return securePassword;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private  string SetRequestResponseRequest(string query)
        {
            try
            {
                string content = string.Empty;
                var request = (HttpWebRequest)WebRequest.Create(SharePointPWAUrl + query);
                request.Credentials = new SharePointOnlineCredentials(UserPWA, GenerateSecurePassword());
                request.Headers.Add(HttpRequestHeader.Cookie, new SharePointOnlineCredentials(UserPWA, GenerateSecurePassword()).GetAuthenticationCookie(new Uri(Base_SharePointUrl)));
                request.Accept = "application/json";

                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    using (var streamReader = new StreamReader(response.GetResponseStream()))
                    {
                        content = streamReader.ReadToEnd();
                    }
                }

                return content;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void GetTaskOfProject(ref List<Dictionary<string, object>> listProject, ref Dictionary<string, object> dicProjectDetail)
        {
            if (listProject != null)
            {
                foreach (Dictionary<string, object> project in listProject)
                {
                    string response = SetRequestResponseRequest(queryPwa.GetTaskOfProject(project["ProjectId"].ToString()));
                    Dictionary<string, object> dicProjectTask = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                    List<Dictionary<string, object>> listDic = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectTask["value"].ToString()).ToString());
                    project["Tasks"] = listDic;
                }
            }
            else
            {
                string response = SetRequestResponseRequest(queryPwa.GetTaskOfProject(dicProjectDetail["ProjectId"].ToString()));
                Dictionary<string, object> dicProjectTask = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                List<Dictionary<string, object>> listDic = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectTask["value"].ToString()).ToString());
                dicProjectDetail["Tasks"] = listDic;
            }
        }

        private void GetRiskOfProject(ref List<Dictionary<string, object>> listProject, ref Dictionary<string, object> dicProjectDetail)
        {

            if (listProject != null)
            {
                foreach (Dictionary<string, object> project in listProject)
                {
                    string response = SetRequestResponseRequest(queryPwa.GetRiskOfProject(project["ProjectId"].ToString()));
                    Dictionary<string, object> dicProjectRisk = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                    List<Dictionary<string, object>> listDic = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectRisk["value"].ToString()).ToString());
                    project["Risks"] = listDic;

                }
            }
            else
            {
                string response = SetRequestResponseRequest(queryPwa.GetRiskOfProject(dicProjectDetail["ProjectId"].ToString()));
                Dictionary<string, object> dicProjectRisk = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                List<Dictionary<string, object>> listDic = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectRisk["value"].ToString()).ToString());
                dicProjectDetail["Risks"] = listDic;
            }
        }

        private void GetIssuesOfProject(ref List<Dictionary<string, object>> listProject, ref Dictionary<string, object> dicProjectDetail)
        {

            if (listProject != null)
            {
                foreach (Dictionary<string, object> project in listProject)
                {
                    string response = SetRequestResponseRequest(queryPwa.GetIssuesOfProject(project["ProjectId"].ToString()));
                    Dictionary<string, object> dicProjectIssues = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                    List<Dictionary<string, object>> listDic = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectIssues["value"].ToString()).ToString());
                    project["Issues"] = listDic;
                }
            }
            else
            {
                string response = SetRequestResponseRequest(queryPwa.GetIssuesOfProject(dicProjectDetail["ProjectId"].ToString()));
                Dictionary<string, object> dicProjectIssues = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                List<Dictionary<string, object>> listDic = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectIssues["value"].ToString()).ToString());
                dicProjectDetail["Issues"] = listDic;
            }
        }

        private void GetTeamOfProject(ref List<Dictionary<string, object>> listProject, ref Dictionary<string, object> dicProjectDetail)
        {

            if (listProject != null)
            {
                foreach (Dictionary<string, object> project in listProject)
                {
                    string response = SetRequestResponseRequest(queryPwa.GetUserOfProject(project["ProjectId"].ToString()));
                    Dictionary<string, object> dicProjectUser = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                    List<Dictionary<string, object>> listDic = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectUser["value"].ToString()).ToString());
                    project["Team"] = listDic;
                }
            }
            else
            {
                string response = SetRequestResponseRequest(queryPwa.GetUserOfProject(dicProjectDetail["ProjectId"].ToString()));
                Dictionary<string, object> dicProjectUser = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                List<Dictionary<string, object>> listDic = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(JsonConvert.DeserializeObject<object>(dicProjectUser["value"].ToString()).ToString());
                dicProjectDetail["Team"] = listDic;
            }
        }
    }


    internal class QueryPwa
    {
        
        //?$top=5&$filter=Seinformaentablero eq 'Si'&$select=ProjectName,ProjectSponsor,EstadodelProyecto,SaluddelProyecto,NPV,IRR,Payback,Objetivos,ProjectId,FTE,ProjectOwnerName,Seinformaentablero,ProjectModifiedDate,Departamentosdelosproyectos,ProjectLastPublishedDate,ProjectOwner,PresupuestoTotal,PresupuestoPlanificado,PresupuestoErogado,Conclusión,FTEsEstimadoPM,FTEsRealPM,TamanoProyecto";
        internal string GetAllProjects = "Projects?$select=ProjectName,ProjectSponsor,EstadodelProyecto,SaluddelProyecto,NPV,IRR,Payback,Objetivos,ProjectId,FTE,ProjectOwnerName,Seinformaentablero,ProjectModifiedDate,Departamentosdelosproyectos,ProjectLastPublishedDate,ProjectOwner,PresupuestoTotal,PresupuestoPlanificado,PresupuestoErogado,Conclusión,FTEsEstimadoPM,FTEsRealPM,TamanoProyecto";

        public string GetTaskOfProject(string id)
        {
            return "Projects(guid'" + id + "')/Tasks?$select=TaskIndex,TaskId,TaskName,TaskStartDate,TaskFinishDate,TaskActualDuration,TaskActualRegularWork,TaskDuration,TaskPercentCompleted,TaskRemainingDuration,ParentTaskName,ParentTaskId,TaskActualCost,TaskCost";
        }

        public string GetRiskOfProject(string id)
        {
            return "Projects(guid'" + id + "')/Risks?$select=Description,ProjectId";
        }

        public string GetIssuesOfProject(string id)
        {
            return "Projects(guid'" + id + "')/Issues";
        }

        public string GetProjectByID(string id)
        {
            return "Projects(guid'" + id + "')?$select=ProjectName,ProjectSponsor,EstadodelProyecto,SaluddelProyecto,NPV,IRR,Payback,Objetivos,ProjectId,FTE,ProjectOwnerName,Seinformaentablero,ProjectModifiedDate,Departamentosdelosproyectos,ProjectLastPublishedDate,ProjectOwner,PresupuestoTotal,PresupuestoPlanificado,PresupuestoErogado,Conclusión,FTEsEstimadoPM,FTEsRealPM,TamanoProyecto";
        }

        public string GetUserOfProject(string id)
        {
            return "Projects(guid'" + id + "')/Assignments?$select=ResourceName,ResourceId";
        }

    }


}

