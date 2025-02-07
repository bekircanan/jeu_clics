using System;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace backend.Controllers;
[Route("api/game-end")]
[ApiController]
public class EndController : ControllerBase
{
    private IConfiguration _config;
    public EndController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("pseudo")]
    public JsonResult ClassPseudo([FromForm] int id)
    {
        if (id == 0)
        {
            return new JsonResult(new { error = "Invalid or missing id" });
        }

        string query = @"SELECT (COUNT(*) + 1) as 'rank'
                        FROM gameh 
                        WHERE pseudo = (SELECT pseudo FROM gameh WHERE id_partie = @Id) 
                        AND avg_time < (SELECT avg_time FROM gameh WHERE id_partie = @Id)";

        string sqlDataSource = _config.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        DataTable datatable = new DataTable();

        using (MySqlConnection mySqlCon = new MySqlConnection(sqlDataSource))
        {
            try
            {
                mySqlCon.Open();
                using (MySqlCommand mySqlCmd = new MySqlCommand(query, mySqlCon))
                {
                    mySqlCmd.Parameters.AddWithValue("@Id", id);
                    datatable.Load(mySqlCmd.ExecuteReader());
                    return new JsonResult(datatable);
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { error = ex.Message });
            }
        }
    }

    [HttpPost("tout")]
    public JsonResult ClassTout([FromForm] int id)
    {
        if (id == 0)
        {
            return new JsonResult(new { error = "Invalid or missing id" });
        }

        string query = @"SELECT (COUNT(*) + 1) as 'rank'
                        FROM gameh 
                        WHERE avg_time < (SELECT avg_time FROM gameh WHERE id_partie = @Id)";

        string sqlDataSource = _config.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        DataTable datatable = new DataTable();

        using (MySqlConnection mySqlCon = new MySqlConnection(sqlDataSource))
        {
            try
            {
                mySqlCon.Open();
                using (MySqlCommand mySqlCmd = new MySqlCommand(query, mySqlCon))
                {
                    mySqlCmd.Parameters.AddWithValue("@Id", id);
                    datatable.Load(mySqlCmd.ExecuteReader());
                    return new JsonResult(datatable);
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { error = ex.Message });
            }
        }
    }


    [HttpPost("clicks")]
    public JsonResult Clicks([FromForm] int id)
    {
        string query = "SELECT nombre_clic, temps_clic FROM gamed WHERE id_partie = @Id";
        string sqlDataSource = _config.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        DataTable datatable = new DataTable();
        using (MySqlConnection mySqlCon = new MySqlConnection(sqlDataSource))
        {
            try
            {
                mySqlCon.Open();
                using (MySqlCommand mySqlCmd = new MySqlCommand(query, mySqlCon))
                {
                    mySqlCmd.Parameters.AddWithValue("@Id", id);
                    datatable.Load(mySqlCmd.ExecuteReader());
                    return new JsonResult(datatable);
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { error = ex.Message });
            }
        }
    }


    [HttpPost("id")]
    public JsonResult Id([FromForm] string pseudo)
    {
        try
        {
            string query = "SELECT id_partie FROM gameh WHERE pseudo = @Pseudo ORDER BY date DESC LIMIT 1";
            string sqlDataSource = _config.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
            DataTable datatable = new DataTable();
            using (MySqlConnection mySqlCon = new MySqlConnection(sqlDataSource))
            {
                mySqlCon.Open();
                using (MySqlCommand mySqlCmd = new MySqlCommand(query, mySqlCon))
                {
                    mySqlCmd.Parameters.AddWithValue("@Pseudo", pseudo);

                    datatable.Load(mySqlCmd.ExecuteReader());
                    return new JsonResult(datatable);
                }
            }
        }
        catch (Exception ex)
        {
            return new JsonResult(new { error = ex.Message });
        }
    }


}
