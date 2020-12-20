using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPi.Entities;
using WebAPi.Interfaces;

namespace WebAPi.Repository
{
    public class OrderDetailsRepositry:Repositoy<OrderDetails>, IOrderDetailsRepositry
    {
        public OrderDetailsRepositry(DbContext _context) : base(_context) { }

    }
}
