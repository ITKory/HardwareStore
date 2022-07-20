#nullable disable

namespace HardwareStore.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public int? BasketId { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public virtual Basket Basket { get; set; }
    }
}
