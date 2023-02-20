export interface Activity {
    id: string;
    title: string;
    dateTime: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
}