using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Dtos
{
    public class MasterForTotalDto
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public decimal Gtotal { get; set; }
    }
}
