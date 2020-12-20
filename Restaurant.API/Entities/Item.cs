using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Entities
{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string ItemName { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? ItemPrice { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
