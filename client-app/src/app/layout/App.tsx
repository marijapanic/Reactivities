import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import { useEffect } from 'react';
import NavBar from './NavBar';
import HomePage from '../../features/activities/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else {
      commonStore.setAppLoaded()
    }
  });

  if (!commonStore.appLoaded)
  {
    return <LoadingComponent content='Loading app....'></LoadingComponent>
  }

  return (
    <>
      <ModalContainer></ModalContainer>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'></ToastContainer>
      {location.pathname === "/" ? <HomePage></HomePage> :
        (
          <>
            <NavBar></NavBar>
            <Container style={{ marginTop: "7em" }}>
              <Outlet />
            </Container>
          </>
        )}
    </>
  );
}

export default observer(App);
