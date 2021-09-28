using System;
using System.Linq;
using AngularAndNetCoreAuth.Data;
using AngularAndNetCoreAuth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AngularAndNetCoreAuth.Controllers
{
    
    [Route("api/[controller]")]
   // [Authorize]
    [ApiController]
    [EnableCors("EnableCors")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
       // private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<ProductController> _logger;

        public ProductController(ApplicationDbContext db,ILogger<ProductController> logger)
        {
            _db = db;
        
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IQueryable<Product>> SaveProducts([FromBody] Product product)
        {
            try
            {
                _db.Product.Add(product);
                _db.SaveChanges();

                return new CreatedResult($"/products/{product.Id}", product);
            }
            catch (Exception e)
            {
                _logger.LogWarning(e, "Unable to save product.");

                return ValidationProblem(e.Message);
            }
        }

        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public ActionResult<IQueryable<Product>> GetProducts()
        {
            var result = _db.Product as IQueryable<Product>;
            return Ok(result.Where(p => p.Status == true).OrderBy(p => p.Name));
        }
    }
}