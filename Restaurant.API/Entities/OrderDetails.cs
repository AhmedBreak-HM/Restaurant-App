using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Entities
{
    public class OrderDetails
    {
        [Key]
        public long DetailsId { get; set; }
        public long? OrderId { get; set; }
        public int? ItemId { get; set; }
        public int? DetailsQuantity { get; set; }

        [ForeignKey(nameof(ItemId))]
        public Item Item { get; set; }
        [ForeignKey(nameof(OrderId))]
        public OrderMaster OrderMaster { get; set; }
    }
}
