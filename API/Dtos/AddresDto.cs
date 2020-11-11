using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class AddresDto
    {
        [Required(ErrorMessage = "Imię jest wymagane")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Nazwisko jest wymagane")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Ulica jest wymagana")]
        public string Street { get; set; }

        [Required(ErrorMessage = "Miast jest wymagane")]
        public string City { get; set; }

        [Required(ErrorMessage = "Region jest wymagany")]
        public string State { get; set; }

        [Required(ErrorMessage = "Kod pocztowy jest wymagany")]
        public string Zipcode { get; set; }
    }
}