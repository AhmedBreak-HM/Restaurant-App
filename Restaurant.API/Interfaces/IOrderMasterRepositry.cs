using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPi.Dtos;
using WebAPi.Entities;

namespace WebAPi.Interfaces
{
   public interface IOrderMasterRepositry: IRepositoy<OrderMaster>
    {
        Task<ObjectResult> GetOrderes();
        Task<ActionResult<OrderMaster>> GetOrder(long id);
        Task<OrderMaster> GetById(long id);
        IEnumerable<MasterForTotalDto> GetOrdersTotalForCustomer();
    }
}
