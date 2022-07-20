using HardwareStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace HardwareStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly Models.HardwareStoreContext _dbContext;


        public ProductController(Models.HardwareStoreContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        [Route("products")]
        public async Task<IActionResult> GetProducts()
        {
            List<Product> products = await _dbContext.Products.OrderByDescending(c => c.Name).ToListAsync();


            return StatusCode(StatusCodes.Status200OK, products);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("Add")]
        public async Task<IActionResult> AddProduct([FromBody] Product student)
        {
            await _dbContext.Products.AddAsync(student);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, student);
        }
        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("Edit")]
        public async Task<IActionResult> UpdateProduct([FromBody] Product student)
        {
            _dbContext.Products.Update(student);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, student);
        }


        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> UpdateProduct(int id)
        {
            Product student = _dbContext.Products.Find(id);

            _dbContext.Products.Remove(student);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, student);
        }

    }
}
