namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {

        public ProductItemOrdered()
        {
            
        }
        public ProductItemOrdered(int productItemId, string productName, string pictureUrl , int width, int height)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
            Width = width;
            Height = height;
        }

        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}