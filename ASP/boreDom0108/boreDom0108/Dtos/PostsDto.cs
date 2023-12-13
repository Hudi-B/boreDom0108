namespace boreDom0108.Dtos
{
    public record PostsDto(int Id, string Title, string Content, string ImageId, int CategoryId, DateTime CreatedDate);
    public record CreatePostsDto(string Title, string Content, string ImageId,int CategoryId);
    public record UpdatePostsDto(string Title, string Content, string ImageId, int CategoryId);
}
