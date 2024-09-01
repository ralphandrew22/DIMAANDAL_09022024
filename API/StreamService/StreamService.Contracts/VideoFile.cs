using Microsoft.AspNetCore.Http;

namespace StreamService.Contracts
{
    public class VideoFile
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile File { get; set; }
        public string VideoFileUrl { get; set; }
        public VideoCategory VideoCategory { get; set; }

    }
}
