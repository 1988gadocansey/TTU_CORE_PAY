using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AngularAndNetCoreAuth.Models
{
    public class Payment : BaseEntity
    {
        // refers to ID in srms student table

        public  string Indexno { get; set; }
        public  string Name { get; set; }
        public  string Email { get; set; }
        
        public Guid ProductId { get; set; }
        
        [Required] public decimal Amount { set; get; }
        [Required] public string Bank { get; set; }

        
        [Required] public string AcademicYear { get; set; }

        public string PaymentRemarks { get; set; }

        // actual phone no used for the payment
        [Required] public string Phone { get; set; }
        [Required] public bool Status { get; set; }
        [Required] public Guid TransactionId { get; set; }

        [Required] public string WalletType { get; set; } // eg mtn, voda, airtel, mastercard...

        // actual date the client initiated the transaction
        [DataType(DataType.DateTime)] public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        // date the bank push transaction to us
        [DataType(DataType.DateTime)] public DateTime BankDate { get; set; }
    }
}