#nullable disable

namespace HardwareStore.Models
{
    public partial class Product
    {
        public Product()
        {
            Baskets = new HashSet<Basket>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string LongDescription { get; set; }
        public string Image { get; set; }
        public int Cost { get; set; }

        public virtual ICollection<Basket> Baskets { get; set; }
    }
}
