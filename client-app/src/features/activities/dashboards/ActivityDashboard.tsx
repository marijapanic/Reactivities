import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Prop
{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectSelectActivity: (id:string) => void;
    cancelSelectActivity: () => void;
}

export default function ActivityDashboard(prop : Prop)
{
    const {activities, selectedActivity, selectSelectActivity, cancelSelectActivity} = prop;
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList
                    activities={activities}
                    selectSelectActivity={selectSelectActivity}></ActivityList>
            </Grid.Column>
            
            <Grid.Column width="6">
                {selectedActivity ?
                <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}></ActivityDetails> : ``} 
                <ActivityForm></ActivityForm>      
            </Grid.Column>
        </Grid>
    );
}