using HardwareStore.Models;
using HardwareStore.Services;
using HardwareStore.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace HardwareStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly Models.HardwareStoreContext _dbContext;
        IConfiguration _configuration;
        IAcccountService _accountService;
        public AccountController(Models.HardwareStoreContext dbContext, IConfiguration configuration, IAcccountService accountService)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _accountService = accountService;
        }



        [HttpPost]
        [Route("auth")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var token = CreateToken(model.Login, model.Password);
            if (token == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            /*var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            */
            var response = new
            {
                access_token = token,
            };

            return Ok(response);
        }



        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (_dbContext.Users.FirstOrDefault(u => u.Email == model.Email) != null)
                return BadRequest();

            User user = new()
            {
                Name = model.Name,
                PhoneNumber = model.PhoneNumber,
                Role = "Admin",
                Email = model.Email,
                Password = _accountService.HashPassword(model.Password)
            };

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("get-role")]
        public async Task<IActionResult> GetRole()
        {

            var role = _accountService.GetMyRole();
            if (role != null)
                return Ok(new {Role=role});
            return BadRequest();

        }
        private string? CreateToken(string email, string password)
        {
            var person = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            if (_accountService.VerifyPassword(person.Password, password))
            {
                List<Claim> claims = new()
                {
                new Claim(ClaimTypes.Name,person.Name),
                new Claim(ClaimTypes.Role,person.Role)
                };
                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds

                    );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            return null;
        }

        /*    private ClaimsIdentity? GetIdentity(string email, string password)
            {
                var person = _dbContext.Users.FirstOrDefault(u => u.Email == email);
                if (AccountService.VerifyPassword(person.Password,password))
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, person.Name),
                        new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role),
                    };
                    ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);
                    return claimsIdentity;
                }
                return null;
            }*/

    }
}
