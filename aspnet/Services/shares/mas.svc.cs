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


        #region emp
        [OperationContract]
        public string get_emp(string connectString)
        {
            errmsg = null;

            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();
                    var q = from p in dc.Emps
                            where p.Emp_status != 'X'
                            orderby p.Emp_code ascending
                            select p;
                    foreach(var p in q)
                    {
                        var qd = from c in dc.Divisions
                                 where c.Division_code == p.Division_code
                                 select c;
                        p.Division_name = qd.First().Division_name;
                    }
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

        [OperationContract]
        public string get_emp_rec(string connectString, string emp_code)
        {
            errmsg = null;

            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();
                    var q = (from p in dc.Emps
                            where p.Emp_code.Trim()==emp_code.Trim()
                             select p).ToList();
                   
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
        public string emp_insert_record(string connectString, string data_rec)
        {
            errmsg = null;
            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();
                    Emp rec = serializer.Deserialize<Emp>(data_rec);

                    dc.Emps.InsertOnSubmit(rec);
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
        public string emp_update_record(string connectString, string data_rec)
        {
            errmsg = null;
            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();
                    Emp rec = serializer.Deserialize<Emp>(data_rec);
                    var q = (from p in dc.Emps
                             where p.Emp_code == rec.Emp_code
                             select p).First();
                    q.Emp_name= rec.Emp_name;
                    q.Emp_salary = rec.Emp_salary;
                    q.Emp_birth = rec.Emp_birth;
                    q.Emp_start = rec.Emp_start;
                    q.Emp_query = rec.Emp_query;
                    q.Emp_entry = rec.Emp_entry;
                    q.Emp_status = rec.Emp_status;
                    q.Emp_state = rec.Emp_state;
                    q.Division_code = rec.Division_code;

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
        public string emp_delete_record(string connectString, string emp_code)
        {
            errmsg = null;
            using (masDataContext dc = new masDataContext(connectString))
            {
                try
                {
                    dc.Connection.Open();

                    var q = from p in dc.Emps
                            where p.Emp_code.Trim() == emp_code.Trim()
                            select p;
                    if (q.Count() == 0)
                    {
                        return "ไม่พบ รหัส.";
                    }
                    dc.Emps.DeleteOnSubmit(q.First());
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

        #endregion

    }
}
