using System.Security.Claims;

namespace HardwareStore.Services
{
    public  class AccountService:IAcccountService
    {
        IHttpContextAccessor _httpContextAccessor;

        public AccountService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public   string HashPassword(string password)
            => BCrypt.Net.BCrypt.HashPassword(password);

        public   bool VerifyPassword(string passwordHash, string password)
            => BCrypt.Net.BCrypt.Verify(password, passwordHash);

        public string GetMyRole()
        {
            var result = _httpContextAccessor.HttpContext.User.Identity.Name; 
            if (_httpContextAccessor.HttpContext != null)
                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
            return result;
        }
    }
}
