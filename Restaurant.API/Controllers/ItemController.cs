using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPi.Entities;
using WebAPi.Interfaces;

namespace WebAPi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyCors")]

    public class ItemController : ControllerBase
    {
        private readonly IUnitOfWork Uow;

        public ItemController(IUnitOfWork _unitOfWork)
        {
            Uow = _unitOfWork;
        }

        // GET: api/Item
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemes()
        {
            var result = await Uow.ItemRepos.GetAll();
            return new ObjectResult(result);
        }

        // GET: api/Item/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await Uow.ItemRepos.GetById(id);
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST: api/Item
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            if (item == null)
            {
                return NotFound();
            }
            await Uow.ItemRepos.Add(item);
            await Uow.Comit();
            return Ok();
        }

        // PUT: api/Item/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if (id != item.ItemId || item == null)
            {
                return BadRequest();
            }
            Uow.ItemRepos.Update(item);
            await Uow.Comit();
            return Ok();
        }

        // DELETE: api/Item/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Item>> DeleteItem(int id)
        {
            var item = await Uow.ItemRepos.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            if (await ItemExists(id))
            {
                Uow.ItemRepos.Remove(item);
                await Uow.Comit();
                return StatusCode(StatusCodes.Status200OK);
            }
            return item;
        }

        private async Task<bool> ItemExists(int id)
        {
            return await Uow.ItemRepos.Getany(e => e.ItemId == id);
        }

    }
}


