#nullable disable

namespace HardwareStore.Models
{
    public partial class Basket
    {
        public Basket()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Credentials { get; set; }
        public bool Status { get; set; }

        public virtual Product Product { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
