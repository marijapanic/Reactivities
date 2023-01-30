import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

function ActivityDashboard()
{
    const { activityStore } = useStore();

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore]);
  
    if (activityStore.loadingInitial)
    {
      return <LoadingComponent content='Loading activities'></LoadingComponent>
    }

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList></ActivityList>
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