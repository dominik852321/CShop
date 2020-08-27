namespace Core.Specifications
{
    public class CurtainParams
    {
        public const int MaxPageSize = 24;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 12;

        public int PageSize 
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int MinValue { get; set; } = 0;
        public int MaxValue { get; set; } = 1000;
        public string Room { get; set; }
        public string Material { get; set; } 
      

    }
}