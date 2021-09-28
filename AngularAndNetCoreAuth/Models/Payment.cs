using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularAndNetCoreAuth.Models
{
    public class Payment:BaseEntity
    {
        
        // refers to ID in srms student table
        
        public virtual Student student { get; set; }
        [Required]
        public decimal Amount { set; get; }
        [Required]
        public string Bank { get; set; }
        
        public virtual Product product { get; set; }
        [Required]
        public string AcademicYear { get; set; }
        [Required]
        public Guid TransactionId { get; set; }
        // actual date the client initiated the transaction
        [DataType(DataType.DateTime)]
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
        // date the bank push transaction to us
        [DataType(DataType.DateTime)]
        public DateTime BankDate { get; set; }
        
        
    }
}