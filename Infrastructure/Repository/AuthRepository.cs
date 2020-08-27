using System.Text;
using System.Threading.Tasks;
using Core.Interface;
using Core.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _appDbContext;

        #region method public
        public AuthRepository(AppDbContext dataContext)
        {
            _appDbContext = dataContext;
        }

      public async Task<User> Login(string username, string password)
        {
            var user = await _appDbContext.Users.FirstOrDefaultAsync(s=>s.UserName == username);

            if (user != null)
            {
                if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                    return null;
 
                return user;
            }

            return null;
        }

        
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHashSalt(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _appDbContext.Users.AddAsync(user);
            await _appDbContext.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _appDbContext.Users.AnyAsync(x => x.UserName == username))
                return true;

            return false;
        }
        #endregion

        #region  method private
        private void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
          
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var verify = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                for(int i = 0; i < verify.Length; i++)
                {
                    if(verify[i] != passwordHash[i])
                       return false;   
                }
                return true;
            }
        }

        #endregion
    }
}