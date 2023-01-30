import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore
{
    activityRegistry: Map<string, Activity> = new Map();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor()
    {
        makeAutoObservable(this);
    }

    get activitiesByDate()
    {
        return Array.from(this.activityRegistry.values())
        .sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime));
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
        if (activity) this.selectedActivity = activity;

        try {
            this.setLoadingInitial(true);
            activity = await agent.Activities.details(id);
            this.setActivity(activity);
            this.selectedActivity = activity;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setActivity(activity: Activity)
    {
        activity.dateTime = activity.dateTime.split("T")[0];
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