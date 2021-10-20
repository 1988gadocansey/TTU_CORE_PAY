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

namespace AngularAndNetCoreAuth.Controllers
{
    [Route("api/[controller]")]
    // [Authorize]
    [ApiController]
    [EnableCors("EnableCors")]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        // private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<ProductController> _logger;

        public ProductController(ApplicationDbContext db, ILogger<ProductController> logger)
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

                return new CreatedResult($"/product/{product.Id}", product);
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
         
       
        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Product> DeleteProduct([FromRoute] 
            Guid productId)
        {
            var productDb = _db.Product
                .FirstOrDefault(p => p.Id==productId);
 
            if (productDb == null) return NotFound();
 
            _db.Product.Remove(productDb);
            _db.SaveChanges();
 
            return NoContent();
        }
        
        [HttpGet("{productId:Guid}")]
       
        [ProducesResponseType(StatusCodes.Status200OK)]
        
        public ActionResult Find(Guid productId)
        {
            var productDb = _db.Product
                .FirstOrDefault(p => p.Id==productId);
 
            if (productDb == null) return NotFound();
 
             
 
            return  Ok(productDb.Name);
        }
        
        [HttpPatch]
        [Route("{productId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Product> PatchProduct([FromRoute] Guid productId, [FromBody] JsonPatchDocument<Product> patch)
        {
            try
            {
                var productDb = _db.Product.FirstOrDefault(p => p.Id==productId);
 
                if (productDb == null) return NotFound();
 
                patch.ApplyTo(productDb, ModelState);
 
                if (!ModelState.IsValid || !TryValidateModel(productDb)) 
                    return ValidationProblem(ModelState);
 
                _db.SaveChanges();
 
                return Ok(productDb);
            }
            catch (Exception e)
            {
                _logger.LogWarning(e, "Unable to update product.");
 
                return ValidationProblem(e.Message);
            }
        }
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Product> PutProduct([FromBody] Product product)
        {
            try
            {
                var productDb = _db.Product
                    .FirstOrDefault(p => p.Id==product.Id);
 
                if (productDb == null) return NotFound();
 
                productDb.Name = product.Name;
                productDb.Amount = product.Amount;
                productDb.StartDate = product.StartDate;
                productDb.EndDate = product.EndDate;
                productDb.Banks = product.Banks;
                productDb.Currency = product.Currency;
                productDb.Code = product.Code;
                _db.SaveChanges();
 
                return Ok(product);
            }
            catch (Exception e)
            {
                _logger.LogWarning(e, "Unable to PUT product.");
 
                return ValidationProblem(e.Message);
            }
        }
    }
}