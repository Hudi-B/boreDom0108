using boreDom0108.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace boreDom0108.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly PostsDbContext postsDbContext;
        public CategoriesController(PostsDbContext postsDbContext)
        {
            this.postsDbContext = postsDbContext;
        }

        [HttpGet("{CategoryName}")]
        public async Task<ActionResult<Categories>> GetByClassName(string categoryName) 
        {
            var category = postsDbContext.Categories.SingleOrDefaultAsync(x => x.CategoryName.Equals(categoryName));
            return await category;
        }
    }
}
