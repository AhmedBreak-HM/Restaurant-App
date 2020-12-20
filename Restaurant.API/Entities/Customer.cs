using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Entities
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string CustomerName { get; set; }
        public ICollection<OrderMaster> OrderMaster { get; set; }
    }
}
