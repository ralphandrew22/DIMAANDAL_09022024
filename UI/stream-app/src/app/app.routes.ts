import { Routes } from '@angular/router';
import { VideosComponent } from './components/videos/videos.component';
import { StreamComponent } from './components/stream/stream.component';

export const routes: Routes = [
    {
        path: 'videos',
        component: VideosComponent
    },
    {
        path: 'videos/:videoId',
        component: StreamComponent
    }
];
