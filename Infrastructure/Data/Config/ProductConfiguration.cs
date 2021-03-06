using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.HasOne(b => b.ProductType).WithMany()
                .HasForeignKey(p => p.ProductTypeId);
            builder.HasOne(t => t.ProductRoom).WithMany()
                .HasForeignKey(p => p.ProductRoomId);
        }
    }
}