using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace boreDom0108.Models
{
    public class Posts
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [Column(TypeName = "varchar(30)")]
        public string? Title { get; set; }
        [Required]
        public string? Content { get; set; }
        [Column(TypeName = "varchar(40)")]
        public string? ImageId { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        public Categories? Category { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
