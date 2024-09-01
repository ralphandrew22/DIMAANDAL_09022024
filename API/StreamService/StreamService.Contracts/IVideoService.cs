namespace StreamService.Contracts
{
    public interface IVideoService
    {
        Task<List<VideoFile>> GetVideos();
        Task<VideoFile> GetVideo(int videoId);
        Task<int> UploadVideo(VideoFile video);
    }
}
