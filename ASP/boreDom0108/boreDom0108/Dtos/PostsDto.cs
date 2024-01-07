namespace boreDom0108.Dtos
{
    public record PostsDto(Guid Id, string Title, string Content, string ImageId, int CategoryId, DateTime CreatedDate);
    public record CreatePostsDto(string Title, string Content, string ImageId,Guid CategoryId);
    public record UpdatePostsDto(string Title, string Content, string ImageId, Guid CategoryId);
}
