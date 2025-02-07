using Microsoft.AspNetCore.Mvc;
using System.Data;
using MySql.Data.MySqlClient;
using backend.Model;

namespace backend.Controllers;

[Route("api/game")]
[ApiController]
public class GameController : ControllerBase
{
    private IConfiguration _config;

    public GameController(IConfiguration config)
    {
        _config = config;
    }

    [HttpGet("get_gamed")]
    public JsonResult GetGameD(int id)
    {
        string query = $"SELECT * FROM GameD WHERE id_partie={id}";
        DataTable table = new DataTable();
        string sqlDataSource = _config.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        MySqlConnection mySqlCon = new MySqlConnection(sqlDataSource);
        try
        {
            mySqlCon.Open();
            MySqlDataAdapter mySqlDa = new MySqlDataAdapter(query, mySqlCon);
            mySqlDa.Fill(table);
            return new JsonResult(table);
        }
        catch(Exception ex)
        {
            return new JsonResult(ex.Message);
        }
        finally
        {
            mySqlCon.Close();
        }
    }


    [HttpPost("save")]
    public JsonResult AddGame([FromBody] Gameh game)
    {
        string query = @"
    INSERT INTO Gameh (Pseudo, best_time, avg_time) 
    VALUES (@Pseudo, @Meilleur_temps, @Temps_moyen)";

        string sqlDataSource = _config.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        using (MySqlConnection mySqlCon = new MySqlConnection(sqlDataSource))
        {
            try
            {
                mySqlCon.Open();
                using (MySqlCommand mySqlCmd = new MySqlCommand(query, mySqlCon))
                {
                    mySqlCmd.Parameters.AddWithValue("@Pseudo", game.Pseudo);
                    mySqlCmd.Parameters.AddWithValue("@Meilleur_temps", game.BestTime);
                    mySqlCmd.Parameters.AddWithValue("@Temps_moyen", game.AverageTime);
                    mySqlCmd.ExecuteNonQuery();
                }

                query = "SELECT LAST_INSERT_ID()";
                using (MySqlCommand mySqlCmd = new MySqlCommand(query, mySqlCon))
                {
                    game.Id = Convert.ToInt32(mySqlCmd.ExecuteScalar());
                }

                query = @"
            INSERT INTO GameD (id_partie, Nombre_clic, temps_clic) 
            VALUES (@id_partie, @Nombre_clic, @temps_clic)";

                foreach (var click in game.Clicks)
                {
                    using (MySqlCommand mySqlCmd = new MySqlCommand(query, mySqlCon))
                    {
                        mySqlCmd.Parameters.Clear();
                        mySqlCmd.Parameters.AddWithValue("@id_partie", game.Id);
                        mySqlCmd.Parameters.AddWithValue("@Nombre_clic", click.ClickNumber);
                        mySqlCmd.Parameters.AddWithValue("@temps_clic", click.ClickTime);
                        mySqlCmd.ExecuteNonQuery();
                    }
                }

                return new JsonResult("Added Successfully");
            }
            catch (Exception ex)
            {
                return new JsonResult($"Error: {ex.Message}");
            }
        }
    }

}