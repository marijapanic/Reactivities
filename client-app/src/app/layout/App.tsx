import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';

function App()
{

  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{marginTop: "7em"}}>
        <Outlet />
      </Container>
    </Fragment>
  );
}

export default observer(App);
