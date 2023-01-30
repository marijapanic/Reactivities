import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
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
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDashboard);