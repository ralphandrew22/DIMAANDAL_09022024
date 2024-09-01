import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Video } from "../models/video";

@Injectable({ providedIn: 'root' })
export class VideoService {

    private mockVideos: Video[] = [
        {
            id: 1,
            title: 'birds video',
            description: 'video of birds',
            videoUrl: '../../assets/birds.mp4',
            videoCategory: {
                category: 'birds'
            }
        },
        {
            id: 2,
            title: 'forest video',
            description: 'video of forest',
            videoUrl: '../../assets/Forest.mp4',
            videoCategory: {
                category: 'forest'
            }
        },
        {
            id: 3,
            title: 'puppies video',
            description: 'video of puppies',
            videoUrl: '../../assets/Puppies.mp4',
            videoCategory: {
                category: 'dogs'
            }
        },
        {
            id: 4,
            title: 'walking video',
            description: 'video of walking',
            videoUrl: '../../assets/walk.mov',
            videoCategory: {
                category: 'walking'
            }
        },
        {
            id: 5,
            title: 'water video',
            description: 'video of water',
            videoUrl: '../../assets/water.avi',
            videoCategory: {
                category: 'water'
            }
        }
    ];

    private mockGetAllVideosResponse(): Observable<Video[]> {
        return of(this.mockVideos);
    }

    constructor(private httpClient: HttpClient) {

    }

    getAllVideos(): Observable<Video[]> {
        return this.mockGetAllVideosResponse();
        // return this.httpClient.get<Video[]>('');
    }

    getVideo(videoId: number): Observable<Video | undefined> {
        return of(this.mockVideos.find(mockVideo => mockVideo.id == videoId));
        // return this.httpClient.get<Video>('');
    }
}