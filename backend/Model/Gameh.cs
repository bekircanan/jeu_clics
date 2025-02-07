
namespace backend.Model;
public class Gameh
{
    public int Id { get; set; }
    public string Pseudo { get; set; }
    public double BestTime { get; set; }
    public double AverageTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<GameClick> Clicks { get; set; } = new List<GameClick>();
}
