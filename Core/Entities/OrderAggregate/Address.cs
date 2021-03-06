namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address()
        {
        }

        public Address(string firstName, string lastName, string street, string state, string city, string zipcode, string email, string phone)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            Country = Country;
            City = city;
            Zipcode = zipcode;
            Email = email;
            Phone = phone;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Zipcode { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}