using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Interface;
using Core.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        public readonly IConfiguration _config ;
        private readonly IMapper _mapper;

        private readonly IAuthRepository _authRepository;
        public AuthController(IConfiguration config, IMapper mapper, IAuthRepository authRepository)
        {
            _config = config;
            _mapper = mapper;
            _authRepository = authRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO userForRegister)
        {
            userForRegister.UserName = userForRegister.UserName.ToLower();

            if(await _authRepository.UserExists(userForRegister.UserName))
                 return BadRequest("Użytkownik o takiej nazwie już istnieje");
            
            var user = _mapper.Map<User>(userForRegister);
           
            var createdUser = await _authRepository.Register(user, userForRegister.Password);

            var userToReturn = _mapper.Map<UserToReturnDTO>(createdUser);
            return CreatedAtRoute("GetUser", new { controller = "Users", Id = createdUser.Id}, userToReturn);
        }


        
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO userForLogin)
        {
            var userFromRepo = await _authRepository.Login(userForLogin.UserName.ToLower(), userForLogin.Password);

            if(userFromRepo == null)
                 return Unauthorized();     

            
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName),
                new Claim(ClaimTypes.Role, userFromRepo.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(5),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserToReturnDTO>(userFromRepo);

            return Ok(new 
            { 
                token = tokenHandler.WriteToken(token),
                user
            });
        }


    }
}