using System;
using System.Linq;
using System.Transactions;
using AngularAndNetCoreAuth.Data;
using AngularAndNetCoreAuth.Models;
using AngularAndNetCoreAuth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using RestSharp;

namespace AngularAndNetCoreAuth.Controllers
{
    [Route("api/[controller]")] 
   [Authorize]
    [ApiController]
    [EnableCors("EnableCors")]
    [Produces("application/json")]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IMomo _momoService;
        private  LoginViewModel _userdata;
        
       
        private readonly ILogger<TransactionController> _logger;

        public TransactionController(ApplicationDbContext db, ILogger<TransactionController> logger, IMomo momoService)
        {
            _db = db;
            _logger = logger;
            _momoService = momoService;
            
            
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [Produces("application/json")]
        public IActionResult Save([FromBody] Payment payment)
        {
            try
            {


               
                    // If true send the payment to prudential API
                    // if prudential return true then update SRMS of the payment.
                    var TransactionId=Guid.NewGuid();
                    var PBlRequest=    _momoService.DebitWallet(
                        payment.WalletType,
                        payment.Name,
                        payment.Phone,
                        payment.Amount,
                        TransactionId.ToString(),
                        "TTU Fee Payment"
                    
                    );
                    if (PBlRequest==200)
                    {
                       
                        _db.Payment.AddAsync(
                            new Payment()
                            {
                                Amount = payment.Amount,
                                Status = true,
                                Bank = payment.Bank,
                                AcademicYear = payment.AcademicYear,
                                Phone = payment.Phone,
                                Indexno = payment.Indexno,
                                TransactionId = Guid.NewGuid(),
                                TransactionDate = DateTime.Now,
                                ProductId = payment.ProductId,
                                Email = payment.Email,
                                Name = payment.Name,
                                Level = payment.Level,
                                WalletType = payment.WalletType,
                                PaymentRemarks = "Mobile Payment"

                            });
                        _db.SaveChanges();



                        return Ok("Transaction Successful");
                    }
                    else
                    {
                        _logger.LogWarning("Unable to reach PBL Service. Contact Prudential Bank.");

                        return BadRequest("Enable to reach PBL Service. Contact Prudential Bank");
                    }
                
                   

                 
            }
            catch (Exception e)
            {
                _logger.LogWarning(e, "Unable to save transaction.");

                return ValidationProblem(e.Message);
            }
        }

        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public ActionResult<IQueryable<Payment>> GetTransactions()
        {
            var result = _db.Product as IQueryable<Payment>;
            return Ok(result.Where(p => p.Status == true).OrderByDescending(p => p.TransactionDate));
        }
         
        [HttpGet("Find/{*token}")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public ActionResult<IQueryable<Payment>> Find([FromQuery] string Indexno)
        {
           
            var result = _db.Payment as IQueryable<Payment>;
            return Ok(result.Where(p => p.Indexno == Indexno).OrderBy(p => p.TransactionDate));
            

        }
         
       
        
    }
}