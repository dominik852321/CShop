namespace Core.Specifications
{
    public class TableClothParams
    {
         public const int MaxPageSize = 24;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 15;

        public int PageSize 
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int MinValue { get; set; } = 0;
        public int MaxValue { get; set; } = 500;
        public string Type { get; set; }
    }
}