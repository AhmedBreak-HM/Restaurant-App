using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WebAPi.Interfaces
{
    public interface IRepositoy<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task<int> CountAll();
        Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate);
        Task<bool> Getany(Expression<Func<T, bool>> predicate);
        Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate);
        Task<int> CountWhere(Expression<Func<T, bool>> predicate);
    }
}
