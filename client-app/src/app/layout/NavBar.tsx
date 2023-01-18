import { Button, Container, Menu } from "semantic-ui-react";
interface Prop{
    handleOpenActivityForm: () => void
}
export default function NavBar({handleOpenActivityForm} : Prop)
{
    return (
        <Menu
            inverted
            fixed="top">
                <Container>
                    <Menu.Item header>
                        <img src="/assets/logo.png" alt="log" style={{marginRight: 10}}></img>
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name="Activities"></Menu.Item>
                    <Menu.Item>
                        <Button onClick={handleOpenActivityForm} positive content="Create activity"></Button>
                    </Menu.Item>
                </Container>
        </Menu>
    );
}