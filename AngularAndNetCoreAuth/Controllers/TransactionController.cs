using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Transactions;
using AngularAndNetCoreAuth.Data;
using AngularAndNetCoreAuth.Models;
using AngularAndNetCoreAuth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Serialization.Json;

namespace AngularAndNetCoreAuth.Controllers
{
    [Route("api/[controller]")] 
 // [Authorize]
    [ApiController]
    [EnableCors("EnableCors")]
    [Produces("application/json")]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IMomo _momoService;
        private  LoginViewModel _userdata;
        private ProductController _productController;
        
        private readonly ILogger<TransactionController> _logger;

        public TransactionController(ApplicationDbContext db, ILogger<TransactionController> logger, IMomo momoService )
        {
            _db = db;
            _logger = logger;
            _momoService = momoService;
           

        }
        
         

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [Produces("application/json")]
        public IActionResult Test([FromQuery] string wallet, string phone, decimal amount, string name)
        {
           
            var TransactionId=Guid.NewGuid();
            var PBlRequest=    _momoService.DebitWallet(wallet,name,phone,amount,Guid.NewGuid().ToString(),"momo pay");
            return Ok("created");
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [Produces("application/json")]
        public IActionResult Save([FromBody] Payment payment)
        {
            try
            {
                
                var productName = _momoService.Find(payment.ProductId);
                    // If true send the payment to prudential API
                    // if prudential return true then update SRMS of the payment.
                    var TransactionId=Guid.NewGuid();
                    var PBlRequest=    _momoService.DebitWallet(
                        payment.WalletType,
                        payment.Name,
                        payment.Phone,
                        payment.Amount,
                        TransactionId.ToString(),
                        productName
                    
                    );
                    if (PBlRequest==200)
                    {
                        
                        var response= _momoService.GetTransactionStatus(payment.WalletType,TransactionId.ToString());
                     
                       
                        var jsonResult = JsonConvert.DeserializeObject(response).ToString();
                        var responseData= JsonConvert.DeserializeObject<PBLResponse>(jsonResult);
                        var result = int.Parse(responseData.status);
                        bool stat = result==0;
                        _db.Payment.AddAsync(
                            new Payment()
                            {
                                Amount = payment.Amount,
                                Status =stat,
                                Bank = payment.Bank,
                                AcademicYear = payment.AcademicYear,
                                Phone = payment.Phone,
                                Indexno = payment.Indexno,
                                TransactionId = TransactionId.ToString(),
                                TransactionDate = DateTime.Now,
                                ProductId = payment.ProductId,
                                Email = payment.Email,
                                Name = payment.Name,
                                Level = payment.Level,
                                WalletType = payment.WalletType,
                                PaymentRemarks = productName

                            });
                        _db.SaveChanges();
                        if (responseData.status != "0") return BadRequest("Error processing transaction.");
                             // we can send data to srms.
                        if (_momoService.SendPaymentToSRMS(payment.Indexno, Convert.ToDecimal(payment.Amount), "0271900010010",
                            productName, TransactionId.ToString(), DateTime.UtcNow) == "01")
                        {
                            return Ok("Transaction successful.Proceed to portal.");
                        }
                        else{
                            return BadRequest("Error processing fee to student portal. Try again later.");
                        }

                    }
                    else
                    {
                        _logger.LogWarning("Unable to reach PBL Service. Contact Prudential Bank.");

                        return BadRequest("Error in momo transaction. Contact Prudential Bank");
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
            return Ok(result.Where(p => p.Indexno != "").OrderByDescending(p => p.TransactionDate));
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