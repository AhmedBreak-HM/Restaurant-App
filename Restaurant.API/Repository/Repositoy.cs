using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPi.Interfaces;

namespace WebAPi.Repository
{
    public class Repositoy<T> : IRepositoy<T> where T : class
    {
        private readonly DbContext context;

        public Repositoy(DbContext _context)
        {
            this.context = _context;
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await context.Set<T>().ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await context.FindAsync<T>(id);
        }


        public async Task Add(T entity)
        {
            await context.Set<T>().AddAsync(entity);
        }


        public  void Update(T entity)
        {
            context.Entry(entity).State = EntityState.Modified;
        }

        public void Remove(T entity)
        {
            context.Remove<T>(entity);
        }

        public async Task<int> CountAll()
        {
            return await context.Set<T>().CountAsync();
        }

        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate)
        {
            return await context.Set<T>().Where(predicate).ToListAsync();
        }

        public async Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            return await context.Set<T>().FirstOrDefaultAsync(predicate);
        }

        public async Task<int> CountWhere(Expression<Func<T, bool>> predicate)
        {
            return await context.Set<T>().CountAsync(predicate);
        }

        public async Task<bool> Getany(Expression<Func<T, bool>> predicate)
        {
            return await context.Set<T>().AnyAsync(predicate);
        }
        

    }
}
