import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import ActivityFilter from './ActivityFilter';

function ActivityDashboard()
{
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;

    useEffect(() => {
      if (activityRegistry.size <= 1)
      {
        loadActivities();
      }
    }, [activityRegistry.size, loadActivities]);
  
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
                <ActivityFilter></ActivityFilter>
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDashboard);