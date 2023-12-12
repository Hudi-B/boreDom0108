using boreDom0108.Dtos;
using boreDom0108.Model;
using boreDom0108.Modell;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace boreDom0108.Repositories
{
    public class PostsService : IPostsInterface
    {
        private readonly PostsDbContext postsDbContext;

        public PostsService(PostsDbContext postsDbContext) 
        {
            this.postsDbContext = postsDbContext;
        }
        public async Task Delete(Guid Id)
        {
            var post = await postsDbContext.Posts.SingleOrDefaultAsync(x => x.Id == Id);

            if (post != null)
            {
                postsDbContext.Posts.Remove(post);
                await postsDbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Posts>> Get()
        {
            return await postsDbContext.Posts.ToListAsync();
        }

        public async Task<Posts> GetById(Guid Id)
        {
            var result = postsDbContext.Posts.SingleOrDefaultAsync(x => x.Id.Equals(Id));
            return await result; 
        }

        public async Task<Posts> Post(CreatePostsDto createPostsDto)
        {
            var posts = new Posts
            {
                Id = Guid.NewGuid(),
                Title = createPostsDto.Title,
                Content = createPostsDto.Content,
                ImageId = createPostsDto.ImageId,
                CreatedDate = DateTime.Now,
            };
            await postsDbContext.Posts.AddAsync(posts);
            await postsDbContext.SaveChangesAsync();

            return posts;
        }

        public async Task<Posts> Put(Guid Id, UpdatePostsDto updatePostsDto)
        {

            var postToUpdate = await postsDbContext.Posts.SingleOrDefaultAsync(x => x.Id.Equals(Id));

            if (postToUpdate != null)
            {
               
                postToUpdate.Title = updatePostsDto.Title;
                postToUpdate.Content = updatePostsDto.Content;
                postToUpdate.ImageId = updatePostsDto.ImageId;

               
                await postsDbContext.SaveChangesAsync();
            }

            return postToUpdate; 
        }


    }
}
