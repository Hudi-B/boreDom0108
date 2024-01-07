using boreDom0108.Dtos;

namespace boreDom0108
{
    public static class Extension
    {
        public static PostsDto AsDto(this PostsDto postsDto)
        {
            return new(postsDto.Id, 
                postsDto.Title, 
                postsDto.Content,
                postsDto.ImageId, 
                postsDto.CategoryId, 
                postsDto.CreatedDate
                );
        }
    }
}
