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
    public class CustomerController : ControllerBase
    {
        private readonly IUnitOfWork Uow;

        public CustomerController(IUnitOfWork _unitOfWork)
        {
            this.Uow = _unitOfWork;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            var result = await this.Uow.CustomerRepos.GetAll();
            return result;
        }

        // GET: api/Customer/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await Uow.CustomerRepos.GetById(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            if (customer == null)
            {
                return NotFound();
            }
            await Uow.CustomerRepos.Add(customer);
            await Uow.Comit();
            return Ok();
        }

        // PUT: api/Customer/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustomerId || customer == null)
            {
                return BadRequest();
            }
            Uow.CustomerRepos.Update(customer);
           await Uow.Comit();
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var customer = await Uow.CustomerRepos.GetById(id);
            if (customer == null)
            {
                return NotFound();
            }
            if (await ItemExists(id))
            {
                Uow.CustomerRepos.Remove(customer);
                await Uow.Comit();
                return StatusCode(StatusCodes.Status200OK);
            }
            return customer;

        }
        private async Task<bool> ItemExists(int id)
        {
            return await Uow.CustomerRepos.Getany(e => e.CustomerId == id);
        }
    }
}



