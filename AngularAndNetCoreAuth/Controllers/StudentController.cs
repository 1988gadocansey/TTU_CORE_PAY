using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using AngularAndNetCoreAuth.Data;
using AngularAndNetCoreAuth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using RestSharp;

namespace AngularAndNetCoreAuth.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    [EnableCors("EnableCors")]
    [Produces("application/json")]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        private readonly ILogger<StudentController> _logger;


        public StudentController(ApplicationDbContext db, ILogger<StudentController> logger)
        {
            _db = db;
            _logger = logger;
            
        }

         
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [Produces("application/json")]
        public IActionResult GetStudent([FromQuery]  string Email)
        {
             
            
            var studentRequest = new RestClient($"https://srms.ttuportal.com/api/student/email/{Email}");
           
            var studentData = new RestRequest(Method.GET);
            studentData.AddHeader("Content-type", "application/json");
            var requestRun= studentRequest.Execute(studentData);
         
            Console.WriteLine(requestRun.Content);
            return Ok(requestRun.Content);
        }
    }
}