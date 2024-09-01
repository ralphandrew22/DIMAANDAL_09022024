using Microsoft.AspNetCore.Mvc;
using StreamService.Contracts;
using System.Linq;

namespace StreamService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StreamController : ControllerBase
    {
        private readonly IVideoService _videoService;
        private readonly IHostEnvironment _hostenvironment;
        public StreamController(IVideoService videoService, IHostEnvironment hostingEnvironment)
        {
            _videoService = videoService;
            _hostenvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<List<VideoFile>> Videos()
        {
            return await _videoService.GetVideos();
        }

        [HttpGet]
        public async Task<VideoFile> Video(int videoId)
        {
            return await _videoService.GetVideo(videoId);
        }

        [HttpGet]
        public IResult File(string fileName)
        {
            //var filename = "e8922794-7978-4a64-8c5f-543a050f712c/birds.mp4";
            //Build the File Path.  
            string path = Path.Combine(_hostenvironment.ContentRootPath, "videos/") + fileName;  // the video file is in the wwwroot/files folder  

            var filestream = System.IO.File.OpenRead(path);
            return Results.File(filestream, contentType: "video/mp4", fileDownloadName: fileName, enableRangeProcessing: true);
        }



        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] VideoFile videoFile)
        {
            //32467467
            /**
             video/avi
            video/quicktime
            video/mp4
             */
            if (videoFile.File.Length > 100000000)
            {
                return BadRequest("Video file exceeds maximum size limit of 100MB.");
            }
            var supportedVideoFormats = new string[] { "video/avi", "video/quicktime", "video/mp4" };
            if (!supportedVideoFormats.Any(videoFile.File.ContentType.ToLower().Contains))
            {
                return BadRequest("Unsupported video format.");
            }

            return Ok(await _videoService.UploadVideo(videoFile));
        }
    }
}
