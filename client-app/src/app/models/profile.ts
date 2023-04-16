import { User } from "./user";

export interface Profile {
    displayName: string,
    username: string,
    image?: string;
    bio?: string
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}