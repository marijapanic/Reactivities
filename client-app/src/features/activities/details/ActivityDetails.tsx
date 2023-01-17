import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity
}

export default function ActivityDetails({activity} : Props)
{
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
            <Card.Header>{activity.category}</Card.Header>
            <Card.Meta>
                <span>{activity.dateTime.toString()}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths="2">
                    <Button basic color="blue" content="Edit"></Button>
                    <Button basic color="grey" content="Cancel"></Button>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
}