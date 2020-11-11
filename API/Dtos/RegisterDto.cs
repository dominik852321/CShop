using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required(ErrorMessage = "Email jest wymagany")]
        [EmailAddress(ErrorMessage = "Mail musi mieć formę maila. Czyli np nazwa_użytkownika@gmail.com")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Hasło jest wymagane")]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
        ErrorMessage="Hasło musi mieć 1 Dużą litere, 1 Małą liter, 1 numer, 1 znak specjalny oraz conajmniej 6 znaków")]
        public string Password { get; set; }
    }
}