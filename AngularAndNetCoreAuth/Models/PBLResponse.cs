using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace AngularAndNetCoreAuth.Models
{
    public class PBLResponse
    {
        [JsonPropertyName("status")]
        public string status { get; set; }

        [JsonPropertyName("message")]
        public string message { get; set; }
        
        
        public Details details;
        
        [JsonPropertyName("statusMessage")]
        public string statusMessage { get; set; }
       
    }
}