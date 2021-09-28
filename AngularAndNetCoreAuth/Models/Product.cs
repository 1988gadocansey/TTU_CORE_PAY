using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularAndNetCoreAuth.Models
{
    public class Product:BaseEntity
    {
      
        // refers to ID in srms student table
        [Required]
        public string Code { set; get; }
        [Required]
        public string Name { set; get; }
        [Required]
        public bool AcceptPartPayment { set; get; }
        [Required]
        public string Purpose { set; get; }
        [Required]
        public decimal Amount { set; get; }
        [Required]
        public string Currency { set; get; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        [Required]
        public string Banks { set; get; }
        [Required]
        public string Instructions { set; get; }
        [Required]
        public bool Status { set; get; }
      
        public string Url { set; get; }
    }
}