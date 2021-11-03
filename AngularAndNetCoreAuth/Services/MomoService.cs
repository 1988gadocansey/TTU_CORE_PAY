using System;
using System.Net;
using System.Net.Mime;
using System.Runtime.InteropServices;
using AngularAndNetCoreAuth.Data;
using Microsoft.IdentityModel.Protocols;
using RestSharp.Validation;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Linq;
using RestSharp;
using AngularAndNetCoreAuth.Data;
using AngularAndNetCoreAuth.Models;
using RestSharp.Authenticators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace AngularAndNetCoreAuth.Services
{
    public class MomoService : IMomo
    {
        //private static string url = "http://digihub.prudentialbank.com.gh:8080/MobileMoneyPayment/api/Transaction";
        private static string url = "https://digihub.prudentialbank.com.gh/MobileMoneyPayment/api/Transaction";
        private const string clientAuth = "AD411E74-28C2-4BF9-8F9D-D5B7E22F9226";
        private const string password = "Temp123$";
        private const string username = "momoapi.user.ttu";
        private readonly ApplicationDbContext _db;
        
        private static string srmsUrl = "https://srms.ttuportal.com/api/receivePayment";
        private const string srmsAuth = "128ashbx393932";

        public MomoService(ApplicationDbContext db)
        {
            _db = db;
            
        }
        public void Authenticate()
        {
            Console.WriteLine("hello auth");
        }
        /**
         * walletType eg mtn, voda, airtiel
         * URL /DebitWallet
         */
        public int DebitWallet(string walletType, string senderName, string senderNumber, decimal amount, string transactionId,
            string remarks)
        {
            var client= new RestClient($"{url}/DebitWallet");
            var request = new RestRequest(Method.POST);
            request.AddJsonBody(new
            {
                clientId = clientAuth,
                walletType=walletType,
                senderName=senderName,
                senderNumber=senderNumber,
                amount=amount,
                transactionId=transactionId,
                transactionDate=DateTime.UtcNow,
                remarks= remarks
            
            });
            client.Authenticator = new HttpBasicAuthenticator(username, password);
            request.AddHeader("Content-type", "application/json");
            var  response =  client.Execute(request);
            var responseData = response.Content;
            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;
            return numericStatusCode;
            //dynamic data = JObject.Parse(responseData);
            //return Convert.ToInt16(data.status);
        }
        /**
         * URL /CreditWallet
         */
        public string CreditWallet(string walletType, string receipientName, string receipientNumber, decimal amount,
            string transactionId, string remarks)
        {
            Console.WriteLine($"{url}/CreditWallet");
            var client= new RestClient($"{url}/CreditWallet");
            var request = new RestRequest(Method.POST);
            request.AddJsonBody(new
            {
                clientId = clientAuth,
                walletType=walletType,
                receipientName=receipientName,
                senderNumber=receipientNumber,
                amount=amount,
                transactionId=transactionId,
                remarks= remarks
            
            });
            client.Authenticator = new HttpBasicAuthenticator(username, password);
            request.AddHeader("Content-type", "application/json");
            var  response =  client.Execute(request);
            var responseData = response.Content;
            return responseData;
        }
        /**
         * Get transaction status
         * URL /GetTransactionStatus
         */
        public string GetTransactionStatus(string walletType, string transactionId)
        {
            Console.WriteLine($"{url}/GetTransactionStatus");
            var client= new RestClient($"{url}/GetTransactionStatus");
            var request = new RestRequest(Method.POST);
            request.AddJsonBody(new
            {
                clientId = clientAuth,
                walletType=walletType,
                transactionId=transactionId,
                
            
            });
          
            client.Authenticator = new HttpBasicAuthenticator(username, password);
          
            request.AddHeader("Content-type", "application/json");
            var  response =  client.Execute(request);
            var responseData = response.Content;
            return responseData;
            
        }

        public string Find(Guid productId)
        {
            var productDb = _db.Product
                .FirstOrDefault(p => p.Id==productId);
 
            if (productDb == null) return "product not found";
 
             
 
            return  productDb.Name;
        }

        public string vodaAirtel(string momo)
        {
             
                        
                string[] exceptionNumber = {"026","056","027","057","020","050" };
                int index = Array.IndexOf(exceptionNumber, momo.Substring(0, 3));
                if (index > -1)
                {
                    var strPassword = Guid.NewGuid().ToString("N").Substring(0, 10);
                    return strPassword;
                }
                         
                return  Guid.NewGuid().ToString();
                         
                       
             
        }
        /**
         * send the payment to srms
         */
        public string SendPaymentToSRMS(string indexNo,decimal amount,string accountNumber,string feeType,string transactionId,DateTime transactionDate)

        {
            var client= new RestClient($"{srmsUrl}");
            var request = new RestRequest(Method.POST);
            request.AddJsonBody(new
            {
                indexno = indexNo,
                amount=amount,
                accountNumber=accountNumber,
                fee_type=feeType,
                transactionId=transactionId,
                transactionDate=transactionDate,
                auth= srmsAuth
            
            });
            //client.Authenticator = new HttpBasicAuthenticator(username, password);
            request.AddHeader("Content-type", "application/json");
            var  response =  client.Execute(request);
            var responseData = response.Content;
            var jsonResult = JsonConvert.DeserializeObject(responseData).ToString();
            var result= JsonConvert.DeserializeObject<SrmsResponse>(jsonResult);
           return result.responseCode;

        }
    }
}