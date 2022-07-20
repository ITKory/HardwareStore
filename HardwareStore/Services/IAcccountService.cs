namespace HardwareStore.Services
{
    public interface IAcccountService
    {
        public string GetMyRole();
        public string HashPassword(string password);
        bool VerifyPassword(string passwordHash, string password);
    }
}
