using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPi.Entities;
using WebAPi.Interfaces;

namespace WebAPi.Repository
{
    public class ItemRepositry : Repositoy<Item>, IItemRepositry
    {
        public ItemRepositry(DbContext _context) : base(_context)
        {

        }
    }
}
