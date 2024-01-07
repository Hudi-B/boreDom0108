namespace boreDom0108.Dtos
{
    public record CategoryDTO(Guid ID, string CategoryName, string IconName);
    public record CreateCategoryDTO(string CategoryName, string IconName);
}
