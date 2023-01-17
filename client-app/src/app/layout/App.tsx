import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';
import { Activity } from '../models/activity';

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
    <div>
      <Header as="h2" icon="users" content="Reactivities"></Header>
        <List>
          {activities.map((activity: any) =>
            (
              <ListItem key={activity.id}>
                {activity.title}
              </ListItem>
            ))}
        </List>
    </div>
  );
}

export default App;
