using boreDom0108.Modell;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace boreDom0108.Model
{
    public class Categories
    {
        [Key]
        [Required]
        public Guid CategoryId { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string? CategoryName { get; set; }
    }
}
