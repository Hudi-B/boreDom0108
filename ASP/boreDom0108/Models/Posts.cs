using boreDom0108.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace boreDom0108.Modell
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
        public Guid CategoryId { get; set; }
        public Categories? Category { get; set; }
        public DateTime? CreatedDate { get; set; }



    }
}
