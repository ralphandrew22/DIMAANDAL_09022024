using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using StreamService.Contracts;

namespace StreamService.Repository
{
    public class VideoService : IVideoService
    {
        private readonly ServiceDbContext _dbContext;
        private readonly IHostEnvironment _hostEnvironment;
        public VideoService(ServiceDbContext dbContext, IHostEnvironment hostEnvironment)
        {
            _dbContext = dbContext;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<VideoFile> GetVideo(int videoId)
        {
            var video = _dbContext.VideoFiles.Include(video => video.Category).Where(video => video.Id == videoId).SingleOrDefault();
            var videoFile = new VideoFile
            {
                Id = video.Id,
                Title = video.Title,
                Description = video.Description,
                VideoFileUrl = video.VideoFileUrl,
                VideoCategory = new VideoCategory { Category = video.Category.Category }
            };

            return await Task.FromResult(videoFile);
        }

        public async Task<List<VideoFile>> GetVideos()
        {
            var videos = _dbContext.VideoFiles.Include(video => video.Category).ToList();
            List<VideoFile> videoFiles = new();
            foreach (var video in videos)
            {
                videoFiles.Add(new VideoFile
                {
                    Id = video.Id,
                    Title = video.Title,
                    Description = video.Description,
                    VideoFileUrl = video.VideoFileUrl,
                    VideoCategory = new VideoCategory { Category = video.Category.Category  }
                });
            }
            return await Task.FromResult(videoFiles);
        }

        public async Task<int> UploadVideo(VideoFile video)
        {
            var category = _dbContext.VideoCategories.Where(category => category.Category.ToLower() == video.VideoCategory.Category.ToLower()).SingleOrDefault();
            var categoryId = 0;
            if (category == null)
            {
                _dbContext.VideoCategories.Add(new Entities.VideoCategory
                {
                    Category = video.VideoCategory.Category
                });
                categoryId = await _dbContext.SaveChangesAsync();
            }
            else 
            {
                categoryId = category.Id;
            }

            string videosDirectory = Path.Combine(_hostEnvironment.ContentRootPath, "videos");
            var guid = Guid.NewGuid().ToString();
            Directory.CreateDirectory(Path.Combine(videosDirectory, guid));
            string filePath = Path.Combine(videosDirectory, $"{guid}\\{video.File.FileName}");
            using (Stream fileStream = new FileStream(filePath, FileMode.Create))
            {
                await video.File.CopyToAsync(fileStream);
            }

            var newVideoFile = new Entities.VideoFile
            {
                Title = video.Title,
                Description = video.Description,
                VideoFileUrl = filePath,
                CategoryId = categoryId
            };

            _dbContext.VideoFiles.Add(newVideoFile);

            await _dbContext.SaveChangesAsync();

            return newVideoFile.Id;
        }
    }
}
