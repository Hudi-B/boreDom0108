using boreDom0108.Dtos;
using boreDom0108.Models;
using boreDom0108.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace boreDom0108.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostsInterface postsInterface;

        public PostsController(IPostsInterface postsInterface)
        {
            this.postsInterface = postsInterface;
        }

        [HttpPost]
        public async Task<ActionResult<Posts>> Post(CreatePostsDto createPostsDto)
        {
            return StatusCode(201, await postsInterface.Post(createPostsDto));
        }

        [HttpGet]
        public async Task<ActionResult<Posts>> Get()
        {
            return StatusCode(201, await postsInterface.Get());
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<Posts>> GetById(Guid Id)
        {
            var result = await postsInterface.GetById(Id);

            if (result == null)
            {

                return NotFound();
            }


            return Ok(result);
        }
        [HttpDelete]
        public async Task<ActionResult> Delete(Guid Id)
        {
            await postsInterface.Delete(Id);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult<Posts>> Put(Guid Id, UpdatePostsDto updatePostsDto)
        {
            return StatusCode(201, await postsInterface.Put(Id, updatePostsDto));
        }
    }
}
