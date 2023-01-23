import { Fragment, useEffect, useState } from 'react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboards/ActivityDashboard';
import { v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleCreateOrEditActivity(activity: Activity)
  {
    setSubmitting(true);
    if (activity.id)
    {
      await agent.Activities.update(activity);
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);

    }
    else
    {
      activity.id = uuid();
      await agent.Activities.create(activity);
      setActivities([...activities, activity]);
    }
    activityStore.selectActivity(activity.id);
    activityStore.closeForm();
    setSubmitting(false);
  }

  async function handleDeleteActivity(id: string)
  {
    setSubmitting(true);
    await agent.Activities.delete(id);
    setActivities([...activities.filter(x => x.id !== id)]);
    setSubmitting(false);
  }

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
  {
    return <LoadingComponent content='Loading activities'></LoadingComponent>
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          ></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default observer(App);
