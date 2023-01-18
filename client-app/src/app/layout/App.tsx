import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboards/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<Boolean>(false)

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

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/activities")
      .then(response =>
      {
        setActivities(response.data);
      })
  }, []);

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
          ></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default App;