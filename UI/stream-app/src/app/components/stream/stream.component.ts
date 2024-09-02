import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-stream',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss'
})
export class StreamComponent implements OnInit {

  currentVideo?: Video;
  errorMessage: string;

  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const videoId = paramMap.get('videoId');
      if (videoId) {
        this.videoService.getVideo(+videoId)
          .pipe(
            catchError(error => {
              this.errorMessage = error.message;
              return throwError(() => error);
            })
          )
          .subscribe(
            video => {
              if (video) {
                this.currentVideo = video;
              }
            }
          );
      }
    });
  }

  getVideoFileName(videoFileUrl: string) {
    const videoFileName = videoFileUrl.split('\\videos\\').pop();
    return videoFileName;
  }
}
