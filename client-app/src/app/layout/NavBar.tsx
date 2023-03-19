import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function NavBar()
{
    const { userStore: { user, logout } } = useStore();
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
                    <Menu.Item as={NavLink} to="/errors" name="Errors"></Menu.Item>
                    <Menu.Item>
                        <Button as={NavLink} to="/createActivity" positive content="Create activity"></Button>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Image src={user?.image || '/assets/user.png'} avatar spaced="right"></Image>
                        <Dropdown pointing="top left" text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text="My profile" icon="user"></Dropdown.Item>
                                <Dropdown.Item onClick={logout} text="Logout" icon="power"></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Container>
        </Menu>
    );
})