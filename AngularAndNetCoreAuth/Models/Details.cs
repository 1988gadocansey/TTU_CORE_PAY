using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace AngularAndNetCoreAuth.Models
{
    public class Details
    {
        [JsonPropertyName("status")]
        public string status { get; set; }

        [JsonPropertyName("receiverTransId")]
        public string receiverTransId { get; set; }
        
        [JsonPropertyName("receiverAccountName")]
        public string receiverAccountName { get; set; }
       
        [JsonPropertyName("receiverAccountNumber")]
        public string receiverAccountNumber { get; set; }
        
        [JsonPropertyName("senderName")]
        public string senderName { get; set; }
      
        [JsonPropertyName("senderNumber")]
        public string senderNumber { get; set; }
        
        [JsonPropertyName("senderTransId")]
        public string senderTransId { get; set; }
    }
}