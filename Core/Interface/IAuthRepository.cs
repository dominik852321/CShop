using System.Threading.Tasks;
using Core.Model;

namespace Core.Interface
{
    public interface IAuthRepository
    {
        Task<bool> UserExists(string username);
        Task<User> Register(User user, string password);
        Task<User> Login (string username, string password);
    }
}