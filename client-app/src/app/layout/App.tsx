import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboards/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/activities")
      .then(response =>
      {
        setActivities(response.data);
      })
  }, []);

  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard activities={activities}></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default App;
