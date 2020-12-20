using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPi.Entities;
using WebAPi.Interfaces;

namespace WebAPi.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext context;
        public ICustomerRepositry CustomerRepos { get; }
        public IItemRepositry ItemRepos { get; }
        public IOrderMasterRepositry MasterRepos { get; }
        public IOrderDetailsRepositry DetailsRepos { get; }


        public UnitOfWork(AppDbContext _context)
        {
            this.context = _context;
            this.CustomerRepos = new CustomerRepositry(_context);
            this.ItemRepos = new ItemRepositry(_context);
            this.MasterRepos = new OrderMasterRepositry(_context);
            this.DetailsRepos = new OrderDetailsRepositry(_context);
        }

        public async Task Comit()
        {
            await context.SaveChangesAsync();
        }

        public void Dispose() => context.Dispose();


    }
}
