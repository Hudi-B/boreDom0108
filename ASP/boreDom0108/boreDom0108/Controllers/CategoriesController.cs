using boreDom0108.Dtos;
using boreDom0108.Models;
using Microsoft.AspNetCore.Cors;
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

        [HttpGet]
        public async Task<IEnumerable<Categories>> Get()
        {
            var categs = await postsDbContext.Categories
                .ToListAsync();
            return categs;
        }

        [HttpPost]
        public async Task<Categories> Post(CreateCategoryDTO createCategoryDto)
        {
            var categ = new Categories
            {
                Id = Guid.NewGuid(),
                CategoryName = createCategoryDto.CategoryName,
                IconName = createCategoryDto.IconName,
            };
            await postsDbContext.Categories.AddAsync(categ);
            await postsDbContext.SaveChangesAsync();

            return categ;
        }
    }
}
