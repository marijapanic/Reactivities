import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar()
{
    return (
        <Menu
            inverted
            fixed="top">
                <Container>
                    <Menu.Item as={NavLink} to="/" header>
                        <img src="/assets/logo.png" alt="log" style={{marginRight: 10}}></img>
                        Reactivities
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/activities" name="Activities"></Menu.Item>
                    <Menu.Item>
                        <Button as={NavLink} to="/createActivity" positive content="Create activity"></Button>
                    </Menu.Item>
                </Container>
        </Menu>
    );
}