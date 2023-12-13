using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace boreDom0108.Models
{
    public class Categories
    {
        [Key]
        [Required]
        public int CategoryId { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string? CategoryName { get; set; }
    }
}
