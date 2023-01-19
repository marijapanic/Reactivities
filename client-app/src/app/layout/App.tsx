import { Fragment, useEffect, useState } from 'react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboards/ActivityDashboard';
import { v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const [submitting, setSubmitting] = useState(false);

  function handleSelectActivity(id: string)
  {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function handleCancelSelectActivity()
  {
    setSelectedActivity(undefined);
    setEditMode(false);
  }

  function handleOpenActivityForm(id? : string)
  {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true)
  }

  function handleCloseActivityForm()
  {
    setEditMode(false);
  }

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
    setSelectedActivity(activity);
    setEditMode(false);
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
    agent.Activities.list()
      .then(response =>
      {
        response.forEach(activity => {
          activity.dateTime = activity.dateTime.split("T")[0];
        })
        setActivities(response);
        setLoading(false);
      })
  }, []);

  if (loading)
  {
    return <LoadingComponent content='Loading activities'></LoadingComponent>
  }

  return (
    <Fragment>
      <NavBar handleOpenActivityForm={handleOpenActivityForm}></NavBar>
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectSelectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenActivityForm}
          closeForm={handleCloseActivityForm}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          ></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default App;
