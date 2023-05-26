import { Profile } from "./profile";

export interface Activity {
    id: string;
    title: string;
    dateTime: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername?: string;
    isCancelled?: boolean;
    attendees: Profile[];
    isGoing?: boolean;
    isHost?: boolean;
    host?: Profile;
}

export class Activity implements Activity
{
    constructor(init: ActivityFormValues)
    {
        Object.assign(this, init);
    }
}

export class ActivityFormValues
{
    id: string = "";
    title: string = "";
    dateTime: Date | null = null;
    description: string = "";
    category: string = "";
    city: string = "";
    venue: string = "";

    constructor(activity?: ActivityFormValues)
    {
        if (activity)
        {
            this.id = activity.id;
            this.title = activity.title;
            this.dateTime = activity.dateTime;
            this.description = activity.description;
            this.category = activity.category;
            this.city = activity.city;
            this.venue = activity.venue;
        }
    }
}