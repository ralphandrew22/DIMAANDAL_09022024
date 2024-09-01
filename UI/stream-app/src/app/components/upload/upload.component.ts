import { Component, OnInit } from '@angular/core';
import { Video } from '../../models/video';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
  video: Video = {
    id: 0,
    title: '',
    description: '',
    videoFileUrl: '',
    videoFile: undefined,
    videoCategory: {
      category: ''
    }
  };

  constructor(private router: Router, private videoService: VideoService) { }
  
  ngOnInit(): void { }

  onVideoSelect(event: Event) {
    const files = (event?.target as HTMLInputElement)?.files;
    if (files) {
      const videoFile: File = files[0];
      if ((videoFile.size / 1024 / 1024) > 100) {
        return;
      }

      const videoExtension = videoFile.name.toLowerCase().split('.').pop()!;
      if (!['mp4', 'mov', 'avi'].includes(videoExtension)) {
        return;
      }
      this.video.file = videoFile;
      this.video.videoFileUrl = videoFile.name;
    }
  }

  isVideoFileValid(): boolean {
    return !!this.video.file;
  }

  updateTitle($event) {
    this.video.title = $event.srcElement.value;
  }

  updateDescription($event) {
    this.video.description = $event.srcElement.value;
  }

  updateCategory($event) {
    this.video.videoCategory.category = $event.srcElement.value;
  }

  onUpload() {
    this.videoService.uploadVideo(this.video).subscribe(
      uploadedVideoId => {
        this.router.navigate(['../videos', uploadedVideoId]);
      }
    );
  }
}
