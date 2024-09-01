using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamService.Entities
{
    [Table("VideoFile", Schema = "dbo")]
    public class VideoFile
    {
        [Key]
        public int Id { get; set; }
        public string Title {  get; set; }
        public string Description { get; set; }
        public string VideoFileUrl { get; set; }
        public int CategoryId { get; set; }
        public virtual VideoCategory Category { get; set; }

    }
}
