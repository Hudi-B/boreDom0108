﻿using boreDom0108.Dtos;
using boreDom0108.Models;

namespace boreDom0108.Repositories
{
    public interface IPostsInterface
    {
        Task<IEnumerable<Posts>> Get();
        Task<List<Posts>> GetByCategoryName(string CategoryName);
        Task<Posts> GetById(Guid Id);
        Task<Posts> Post(CreatePostsDto createPostsDto);
        Task<Posts> Put(Guid Id, UpdatePostsDto updatePostsDto);
        Task Delete(Guid Id);
    }
}
