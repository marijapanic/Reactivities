import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

export default class ActivityStore
{
    activityRegistry: Map<string, Activity> = new Map();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor()
    {
        makeAutoObservable(this);
    }

    get activitiesByDate()
    {
        return Array.from(this.activityRegistry.values())
        .sort((a, b) => a.dateTime!.getTime() - b.dateTime!.getTime());
    }

    get groupedActivities()
    {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activitiy) =>
            {
                const date = format(activitiy.dateTime!, "dd MMM yyyy");
                activities[date] = activities[date] ? [...activities[date], activitiy] : [activitiy];

                return activities;
            }, {} as {[key:string]: Activity[]})
        )
    }

    loadActivities = async () =>
    {
        try
        {
            this.setLoadingInitial(true);
            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                this.setActivity(activity);
            });

            this.setLoadingInitial(false);
        }
        catch (error)
        {
            console.log(error);

            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity)
        {
            this.selectedActivity = activity;

            return activity;
        }

        try {
            this.setLoadingInitial(true);
            activity = await agent.Activities.details(id);
            this.setActivity(activity);
            runInAction(() =>
            {
                this.selectedActivity = activity;
            })
            this.setLoadingInitial(false);
            return activity;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setActivity(activity: Activity)
    {
        activity.dateTime = new Date(activity.dateTime!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity(id: string)
    {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial(state: boolean)
    {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) =>
    {
        this.loading = true;

        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(() =>
            {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() =>
            {
                this.loading = false;
            });
        }
    }

    updateActivity = async (activity: Activity) =>
    {
        this.loading = true;

        try {
            await agent.Activities.update(activity);

            runInAction(() =>
            {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            runInAction(() =>
            {
                this.loading = false;
            });
        }
    }

    deleteActivity = async (id: string) =>
    {
        this.loading = true;

        try {
            await agent.Activities.delete(id);
            runInAction(() =>
            {
                this.activityRegistry.delete(id);
                this.loading = false;
            });

        } catch (error) {
            runInAction(() =>
            {
                this.loading = false;
            });
        }
    }
}