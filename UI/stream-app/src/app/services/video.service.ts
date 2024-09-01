import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Video } from "../models/video";

@Injectable({ providedIn: 'root' })
export class VideoService {
    streamServiceBaseUrl = 'https://localhost:7229/api/Stream';

    constructor(private httpClient: HttpClient) { }

    getAllVideos(): Observable<Video[]> {
        return this.httpClient.get<Video[]>(`${this.streamServiceBaseUrl}/Videos`);
    }

    getVideo(videoId: number): Observable<Video | undefined> {
        return this.httpClient.get<Video>(`${this.streamServiceBaseUrl}/Video?videoId=${videoId}`);
    }

    uploadVideo(video: Video): Observable<number> {
        const formData = new FormData();
        formData.append('file', video.file);
        formData.append('title', video.title);
        formData.append('description', video.description)
        formData.append('videoCategory.category', video.videoCategory.category)
        formData.append('videoFileUrl', video.videoFileUrl);
        return this.httpClient.post<number>(`${this.streamServiceBaseUrl}/Upload`, formData);
    }
}