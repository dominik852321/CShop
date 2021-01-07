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

        [Required(ErrorMessage = "Panstwo jest wymagany")]
        public string Country { get; set; }

        [Required(ErrorMessage = "Kod pocztowy jest wymagany")]
        public string Zipcode { get; set; }

        [Required(ErrorMessage = "Email jest wymagany")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Telefon jest wymagany")]
        public string Phone { get; set; }


    }
}