import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";


export default observer(function ActivityDetails()
{
    const { activityStore } = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();

    useEffect(() =>
    {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity)
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
                    <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit"></Button>
                    <Button as={Link} to="/activities" basic color="grey" content="Cancel"></Button>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
});