export interface VideoCategory {
    category: string
}

export interface Video {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    videoCategory: VideoCategory;
}
