using System.Text.Json.Serialization;

namespace AngularAndNetCoreAuth.Models
{
    public class SrmsResponse
    {
        [JsonPropertyName("responseCode")]
        public string responseCode { get; set; }

        [JsonPropertyName("responseMessage")]
        public string responseMessage { get; set; }
    }
}