import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent implements OnInit {
  videos: Video[] = [];
  
  
  constructor(
    private router: Router,
    private videoService: VideoService
  ) {

  }

  ngOnInit(): void {
      this.videoService.getAllVideos().subscribe(
        (videos: Video[]) => {
          this.videos = videos;
        }
      );
  }

  navigateToVideo(videoId: number) {
    this.router.navigate(['/videos', videoId]);
  }

}
