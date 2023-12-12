using boreDom0108.Dtos;
using boreDom0108.Modell;

namespace boreDom0108.Repositories
{
    public interface IPostsInterface
    {
        Task<IEnumerable<Posts>> Get();
        Task<Posts> GetById(Guid Id);
        Task<Posts> Posts(CreatePostsDto createPostsDto);
        Task<Posts> Put(Guid Id,UpdatePostsDto updatePostsDto);
        Task Delete(Guid Id);
    }
}
