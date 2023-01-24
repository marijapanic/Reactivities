import { Fragment, useEffect } from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboards/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

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
        <ActivityDashboard></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default observer(App);
