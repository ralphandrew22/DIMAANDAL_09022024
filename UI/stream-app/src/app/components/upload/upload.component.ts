import { Component, OnInit } from '@angular/core';
import { Video } from '../../models/video';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {

  // videoForm = new FormGroup({
  //   videoTitle: new FormControl(''),
  //   videoDescription: new FormControl(''),
  //   videoCategory: new FormControl('')
  // });

  videoFormGroup = this.formBuilder.group({
    videoFile: [null, { updateOn: 'blur', validators: [Validators.required] }],
    videoTitle: ['', { updateOn: 'blur', validators: [Validators.required] }],
    videoDescription: ['', { updateOn: 'blur', validators: [Validators.required] }],
    videoCategory: ['', { updateOn: 'blur', validators: [Validators.required] }]
  });

  video: Video = {
    id: 0,
    title: '',
    description: '',
    videoUrl: '',
    videoFile: undefined,
    videoCategory: {
      category: ''
    }
  };

  constructor(private formBuilder: FormBuilder) {

  }
  
  ngOnInit(): void {
      
  }

  onVideoSelect(event: Event) {
    const files = (event?.target as HTMLInputElement)?.files;
    if (files) {
      const videoFile: File = files[0];
      if ((videoFile.size / 1024 / 1024) > 100) {
        // error for more than 100MB video
        this.videoFormGroup.controls['videoFile'].setErrors({ error: 'Video exceeds max limit of 100MB' });
        return;
      }

      const videoExtension = videoFile.name.toLowerCase().split('.').pop()!;
      if (!['mp4', 'mov', 'avi'].includes(videoExtension)) {
        this.videoFormGroup.controls['videoFile'].setErrors({ error: 'Unsupported video format.' });
        return;
      }
      this.video.videoFile = videoFile;
      // event.target['value'] = null;
    }
  }

  isVideoFileTouchedOrDirty(): boolean {
    return this.videoFormGroup.get('videoFile')?.touched || this.videoFormGroup.get('videoFile')?.dirty
  }

  isVideoFileValid(): boolean {
    return !!this.video.videoFile;
  }

  onUpload() {

  }
}
