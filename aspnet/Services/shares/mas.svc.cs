using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.IO;
using System.Web.Script.Serialization;
using System.Web;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Net.Mail;
using System.Net.Mime;
using System.Configuration;
using System.Threading.Tasks;
using aspnet.Services.shares;
    
namespace aspnet.Services.shares
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class mas
    {
        #region member
        JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = 2147483647 };
        public string errmsg = null;
       
        #endregion

        [OperationContract]
        public string get_division(string connectString)
        {
            errmsg = null;

            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();
                    var q = from p in dc.Divisions
                            where p.Division_status != 'X'
                            orderby p.Division_code ascending
                            select p;

                    return serializer.Serialize(q);

                }
                catch (Exception e)
                {
                    errmsg = e.Message;
                }
                finally
                {
                    dc.Connection.Close();
                    dc.Dispose();
                }
                return errmsg;
            }
        }

        //add record
        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json,
               ResponseFormat = WebMessageFormat.Json, Method = "POST")]
        public string division_insert_record(string connectString, string data_rec)
        {
            errmsg = null;
            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();
                    Division rec = serializer.Deserialize<Division>(data_rec);
                   
                    dc.Divisions.InsertOnSubmit(rec);
                    dc.SubmitChanges();
                }
                catch (Exception e)
                {
                    errmsg = e.Message;
                }
                finally
                {
                    dc.Connection.Close();
                    dc.Dispose();
                }
            }
            return errmsg;
        }

        //update
        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json,
              ResponseFormat = WebMessageFormat.Json, Method = "POST")]
        public string division_update_record(string connectString, string data_rec)
        {
            errmsg = null;
            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();
                    Division rec = serializer.Deserialize<Division>(data_rec);
                    var q = (from p in dc.Divisions
                             where p.Division_code == rec.Division_code
                             select p).First();
                    q.Division_name = rec.Division_name;
                    q.Division_status = rec.Division_status;
                    dc.SubmitChanges();
                }
                catch (Exception e)
                {
                    errmsg = e.Message;
                }
                finally
                {
                    dc.Connection.Close();
                    dc.Dispose();
                }
            }
            return errmsg;
        }

        //delete
        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json,
              ResponseFormat = WebMessageFormat.Json, Method = "POST")]
        public string division_delete_record(string connectString, string division_code)
        {
            errmsg = null;
            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();
                  
                    var q = from p in dc.Divisions
                             where p.Division_code.Trim() == division_code.Trim()
                             select p;
                    if (q.Count() == 0)
                    {
                        return "Code Not Found";
                    }
                    dc.Divisions.DeleteOnSubmit(q.First());
                    dc.SubmitChanges();
                }
                catch (Exception e)
                {
                    errmsg = e.Message;
                }
                finally
                {
                    dc.Connection.Close();
                    dc.Dispose();
                }
            }
            return errmsg;
        }

    }
}
