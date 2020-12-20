using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPi.Dtos;
using WebAPi.Entities;
using WebAPi.Interfaces;

namespace WebAPi.Repository
{
    public class OrderMasterRepositry : Repositoy<OrderMaster>, IOrderMasterRepositry
    {
        private readonly AppDbContext context;

        public OrderMasterRepositry(AppDbContext _context) : base(_context)
        {
            this.context = _context;
        }

        public async Task<ObjectResult> GetOrderes()
        {
            var result = await this.context.Masters.Select(a => new
            {
                a.OrderId,
                a.OrderNo,
                a.Customer.CustomerName,
                a.Pmethod,
                a.Gtotal
            }).ToListAsync();
            return new ObjectResult(result);
        }

        public async Task<ActionResult<OrderMaster>> GetOrder(long id)
        {
            var order = await this.context.Masters.Where(a => a.OrderId == id)
                              .Select(a => new
                              {
                                  a.OrderId,
                                  a.OrderNo,
                                  a.CustomerId,
                                  a.Pmethod,
                                  a.Gtotal
                              }).FirstOrDefaultAsync();
            var details = await this.context.Details.Where(a => a.OrderId == id)
                               .Select(a => new
                               {
                                   a.DetailsId,
                                   a.OrderId,
                                   a.ItemId,
                                   a.DetailsQuantity,
                                   a.Item.ItemName,
                                   a.Item.ItemPrice,
                                   Total = a.DetailsQuantity * a.Item.ItemPrice
                               }).ToListAsync();
            if (order == null)
            {
                return new NotFoundObjectResult(null);
            }
            return new OkObjectResult(new { order, details });
        }

        public async Task<OrderMaster> GetById(long id)
        {
            return await context.FindAsync<OrderMaster>(id);
        }

        public IEnumerable<MasterForTotalDto> GetOrdersTotalForCustomer()
        {
            var result = context.Masters.GroupBy(g => new
            {
                g.CustomerId,
                g.Customer.CustomerName
            }).Select(b => new MasterForTotalDto
            {
                CustomerId = (int)b.Key.CustomerId,
                CustomerName = b.Key.CustomerName,
                Gtotal = (decimal)b.Sum(s => s.Gtotal)
            }).ToList();
            return result;
        }
    }
}