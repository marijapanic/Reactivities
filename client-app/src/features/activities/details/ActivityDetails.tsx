import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default function ActivityDetails()
{
    const { activityStore } = useStore();
    const {selectedActivity: activity } = activityStore;

    if (!activity)
    {
        return <LoadingComponent></LoadingComponent>;
    }

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
                    <Button onClick={() => activityStore.openForm(activity.id)} basic color="blue" content="Edit"></Button>
                    <Button onClick={activityStore.cancelSelectedActivity} basic color="grey" content="Cancel"></Button>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
}