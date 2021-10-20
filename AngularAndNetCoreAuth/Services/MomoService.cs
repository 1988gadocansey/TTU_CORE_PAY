using System;
using System.Net.Mime;
using System.Runtime.InteropServices;
using Microsoft.IdentityModel.Protocols;
using RestSharp.Validation;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;
namespace AngularAndNetCoreAuth.Services
{
    public class MomoService : IMomo
    {
        //private static string url = "http://digihub.prudentialbank.com.gh:8080/MobileMoneyPayment/api/Transaction";
        private static string url = "https://acs2test.quipugmbh.com:5443";
        private const string username = "";
        private const string password = "";
        private const string clientAuth = "";
        public void Authenticate()
        {
            Console.WriteLine("hello auth");
        }
        /**
         * walletType eg mtn, voda, airtiel
         * URL /DebitWallet
         */
        public string DebitWallet(string walletType, string senderName, string senderNumber, decimal amount, string transactionId,
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
            var  response =  client.Execute(request);
            var responseData = response.Content;
            return responseData;
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
            var  response =  client.Execute(request);
            var responseData = response.Content;
            return responseData;
        }
    }
}