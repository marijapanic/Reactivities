import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';

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
        <List>
          {activities.map((activity: any) =>
            (
              <ListItem key={activity.id}>
                {activity.title}
              </ListItem>
            ))}
        </List>
      </Container>
    </Fragment>
  );
}

export default App;
