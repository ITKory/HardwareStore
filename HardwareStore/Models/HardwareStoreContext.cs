using Microsoft.EntityFrameworkCore;

#nullable disable

namespace HardwareStore.Models
{
    public partial class HardwareStoreContext : DbContext
    {
        public HardwareStoreContext()
        {
        }

        public HardwareStoreContext(DbContextOptions<HardwareStoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Basket> Baskets { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;user=root;password=root;database=hardware_store", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.29-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            modelBuilder.Entity<Basket>(entity =>
            {
                entity.ToTable("basket");

                entity.HasIndex(e => e.ProductId, "product_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Credentials)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("credentials");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Baskets)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("basket_ibfk_1");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cost).HasColumnName("cost");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(300)
                    .HasColumnName("description");

                entity.Property(e => e.Image)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("image");

                entity.Property(e => e.LongDescription)
                    .HasMaxLength(255)
                    .HasColumnName("long_description");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.BasketId, "basket_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BasketId).HasColumnName("basket_id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(30)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("password");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(25)
                    .HasColumnName("phone_number");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("role");

                entity.HasOne(d => d.Basket)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.BasketId)
                    .HasConstraintName("user_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
