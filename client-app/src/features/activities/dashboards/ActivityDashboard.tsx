import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Prop
{
    activities: Activity[];
}

export default function ActivityDashboard({activities} : Prop)
{
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities}></ActivityList>
            </Grid.Column>
            
            <Grid.Column width="6">
                {activities.length ? <ActivityDetails activity={activities[0]}></ActivityDetails> : ``} 
                <ActivityForm></ActivityForm>      
            </Grid.Column>
        </Grid>
    );
}