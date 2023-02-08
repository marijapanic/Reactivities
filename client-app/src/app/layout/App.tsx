import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import HomePage from '../../features/activities/home/HomePage';
import { ToastContainer } from 'react-toastify';

function App()
{
  const location = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'></ToastContainer>
      {location.pathname === "/" ? <HomePage></HomePage> :
      (
        <>
          <NavBar></NavBar>
          <Container style={{marginTop: "7em"}}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
