import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Prop
{
    activities: Activity[];
    submitting: boolean;
    deleteActivity: (id: string ) => void;
}

function ActivityDashboard(prop : Prop)
{
    const {
        activities,
        submitting,
        deleteActivity
    } = prop;

    const { activityStore } = useStore();

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList
                    activities={activities}
                    submitting={submitting}
                    deleteActivity={deleteActivity}></ActivityList>
            </Grid.Column>
            
            <Grid.Column width="6">
                {activityStore.selectedActivity && !activityStore.editMode ?
                <ActivityDetails></ActivityDetails> : ``} 
                {activityStore.editMode && <ActivityForm></ActivityForm>}
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDashboard);