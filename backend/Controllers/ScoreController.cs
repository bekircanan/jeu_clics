using System.Data;
using backend.Model;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace backend.Controllers;
[Route("api/Score")]
[ApiController]
public class ScoreController
{
    private IConfiguration _config;

    public ScoreController(IConfiguration config)
    {
        _config = config;
    }

    [HttpGet("Scores")]
    public JsonResult getScores()
    {
        string query = "SELECT * FROM gameh Order by avg_time asc";
        string sqlDataSource = _config.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        DataTable datatable = new DataTable();
        using (MySqlConnection mySqlCon = new MySqlConnection(sqlDataSource))
        {
            try
            {
                mySqlCon.Open();
                using (MySqlCommand mySqlCmd = new MySqlCommand(query, mySqlCon))
                {
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


}
