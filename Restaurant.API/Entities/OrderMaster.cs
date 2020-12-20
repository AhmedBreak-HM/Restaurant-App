using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Entities
{
    public class OrderMaster
    {
        [Key]
        public long OrderId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string OrderNo { get; set; }
        public int? CustomerId { get; set; }
        public string Pmethod { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Gtotal { get; set; }
        [NotMapped]
        public string DeleteDetails { get; set; }

        [ForeignKey(nameof(CustomerId))]
        public Customer Customer { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }

    }
}
