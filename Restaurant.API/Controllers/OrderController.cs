using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPi.Entities;
using WebAPi.Interfaces;

namespace WebAPi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyCors")]

    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork Uow;
        public OrderController(IUnitOfWork _unitOfWork)
        {
            this.Uow = _unitOfWork;
        }
        // GET: api/Order
        [HttpGet]
        public async Task<ObjectResult> GetOrder()
        {
            return await Uow.MasterRepos.GetOrderes();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderMaster>> GetOrder(long id)
        {
            var order = await Uow.MasterRepos.GetOrder(id);
            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        // POST: api/Order
        [HttpPost]
        public async Task<ActionResult<OrderMaster>> PostOrder(OrderMaster orderMaster)
        {
            try
            {
                if (orderMaster == null)
                {
                    return NotFound();
                }
                if (orderMaster.OrderId == 0)
                {
                    await Uow.MasterRepos.Add(orderMaster);
                    foreach (var item in orderMaster.OrderDetails)
                    {
                        await Uow.DetailsRepos.Add(item);
                    }
                    await Uow.Comit();
                    return Ok();

                }
                else
                {
                    await UpdateDetails(orderMaster.OrderId, orderMaster.OrderDetails.ToList());
                    Uow.MasterRepos.Update(orderMaster);
                    await Uow.Comit();
                    return Ok();
                }

            }
            catch (Exception)
            {

                //throw;
            }

            return Ok();

        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderMaster>> DeleteOrder(long id)
        {
            var order = await Uow.MasterRepos.GetById(id);
            if (order == null)
            {
                return NotFound();
            }
            if (await OrderExists(id))
            {
                Uow.MasterRepos.Remove(order);
                await Uow.Comit();
                return StatusCode(StatusCodes.Status200OK);
            }
            return order;
        }

        private async Task<bool> OrderExists(long id)
        {
            return await Uow.MasterRepos.Getany(e => e.OrderId == id);
        }
        private async Task UpdateDetails(long id, List<OrderDetails> listitem)
        {
            try
            {
                var deleteList = await Uow.DetailsRepos.GetWhere(a => a.OrderId == id);
                foreach (var itemDelete in deleteList)
                {
                    Uow.DetailsRepos.Remove(itemDelete);
                }
                foreach (var item in listitem)
                {
                    await Uow.DetailsRepos.Add(item);
                }

                await Uow.Comit();

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
    }
}
