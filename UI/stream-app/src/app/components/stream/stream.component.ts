import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stream',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss'
})
export class StreamComponent implements OnInit {

  currentVideo?: Video;

  constructor(private videoService: VideoService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const videoId = paramMap.get('videoId');
      if (videoId) {
        this.videoService.getVideo(+videoId).subscribe(
          video => {
            if (video) {
              this.currentVideo = video;
            }
          }
        );
      }
    });
  }
}
