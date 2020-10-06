using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Helpers
{
  public class SqlDataBaseHelper
  {
    public static DataTable ExecuteStoreProcedureQueryInTable(string nameStoreProcedure, Dictionary<string, object> listParamters, string connectionString)
    {
      DataTable queryTable = new DataTable();


      SqlConnection conexionSQL = new SqlConnection(connectionString);

      var data = conexionSQL.DataSource;
      var ba = conexionSQL.Database;
      

      conexionSQL.Open();

      try
      {
        SqlDataAdapter adaptador = new SqlDataAdapter(nameStoreProcedure, conexionSQL);

        adaptador.SelectCommand.CommandType = CommandType.StoredProcedure;

        foreach (KeyValuePair<string, object> parametro in listParamters)
        {
          adaptador.SelectCommand.Parameters.AddWithValue("@" + parametro.Key, parametro.Value);
        }

        adaptador.SelectCommand.CommandTimeout = 120000000;        
        adaptador.Fill(queryTable);

        return queryTable;
      }
      catch (SqlException ex)
      {        
        throw ex;
      }
      catch (Exception ex)
      {        
        throw ex;
      }
      finally
      {
        conexionSQL.Close();
        conexionSQL.Dispose();
      }
    }

    public static DataSet ExecuteStoreProcedureQueryInDataset(string nameStoreProcedure, Dictionary<string, object> listParamters, string connectionString)
    {
      DataSet querySet = new DataSet();


      SqlConnection conexionSQL = new SqlConnection(connectionString);

      var data = conexionSQL.DataSource;
      var ba = conexionSQL.Database;


      conexionSQL.Open();

      try
      {
        SqlDataAdapter adaptador = new SqlDataAdapter(nameStoreProcedure, conexionSQL);

        adaptador.SelectCommand.CommandType = CommandType.StoredProcedure;

        foreach (KeyValuePair<string, object> parametro in listParamters)
        {
          adaptador.SelectCommand.Parameters.AddWithValue("@" + parametro.Key, parametro.Value);
        }

        adaptador.SelectCommand.CommandTimeout = 120000000;
        adaptador.Fill(querySet);

        return querySet;
      }
      catch (SqlException ex)
      {
        throw ex;
      }
      catch (Exception ex)
      {
        throw ex;
      }
      finally
      {
        conexionSQL.Close();
        conexionSQL.Dispose();
      }
    }

  }
}
