import { User } from "./user";

export interface Profile {
    displayName: string;
    username: string;
    image?: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface UserActivity {
    id: string;
    title: string;
    category: string;
    dateTime: Date;
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean
}