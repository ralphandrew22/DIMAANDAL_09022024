export interface VideoCategory {
    category: string
}

export interface Video {
    id?: number;
    title: string;
    description: string;
    videoFileUrl?: string;
    videoFile?: File;
    file?: File;
    videoCategory: VideoCategory;
}
