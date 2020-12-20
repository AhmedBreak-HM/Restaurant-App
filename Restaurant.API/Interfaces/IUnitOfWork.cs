using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ICustomerRepositry CustomerRepos { get; }
        IItemRepositry ItemRepos { get; }
        IOrderMasterRepositry MasterRepos { get; }
        IOrderDetailsRepositry DetailsRepos { get; }

        Task Comit();
    }
}
