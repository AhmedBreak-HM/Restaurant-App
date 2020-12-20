using Microsoft.AspNetCore.Mvc;
using System.Linq;
using WebAPi.Dtos;
using WebAPi.Entities;
using WebAPi.Interfaces;

namespace WebAPi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderTotalController : ControllerBase
    {
        private readonly IUnitOfWork Uow;

        public OrderTotalController(IUnitOfWork _unitOfWork )
        {
            Uow = _unitOfWork;
        }

        // GET: api/<OrderTotalController>
        [HttpGet]
        public IActionResult GetOrderTotal()
        {
            var result = Uow.MasterRepos.GetOrdersTotalForCustomer();
            return Ok(result);
        }
    }
}