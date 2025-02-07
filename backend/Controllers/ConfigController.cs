using Microsoft.AspNetCore.Mvc;
using backend.Model;

namespace backend.Controllers;

[Route("api/config")]
[ApiController]
public class ConfigController : ControllerBase
{
    private IConfiguration _config;
    private ConfigModel settings;

    public ConfigController(IConfiguration config)
    {
        _config = config;
        var maxClicks = _config.GetValue<int>("Game:maxClicks");
        var pageSize = _config.GetValue<int>("Game:pageSize");
        settings = new ConfigModel { MaxClicks = maxClicks, PageSize = pageSize };
    }

    [HttpGet("clicks")]
    public Int32 GetClicks()
    {
        return settings.MaxClicks;
    }

    [HttpGet("page")]
    public Int32 Getpage()
    {
        return settings.PageSize;
    }
}
