using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularAndNetCoreAuth.Models
{
    public class Student :BaseEntity
    {
        [Key]
        public int ID { set; get; }
        // refers to ID in srms student table
        [Required]
        public string StudentId { set; get; }
        [Required]
        public string Stno { set; get; }
        [Required]
        public string IndexNo { set; get; }
        [Required]
        public string Name { set; get; }
        [Required]
        public string Programme { set; get; }
        [Required]
        public string Level { set; get; }
        [Required]
        public string Phone { set; get; }
        [Required]
        public string Email { set; get; }
      
        public virtual UserData user { get; set; }

    }
}