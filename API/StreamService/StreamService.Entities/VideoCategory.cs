using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamService.Entities
{
    [Table("VideoCategory", Schema = "dbo")]
    public class VideoCategory
    {
        [Key]
        public int Id { get; set; }
        public string Category {  get; set; }
    }
}
