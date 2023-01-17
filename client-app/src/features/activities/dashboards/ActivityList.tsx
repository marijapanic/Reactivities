import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Prop
{
    activities: Activity[];
}

export default function ActivityList({activities} : Prop)
{
    return (
        <Segment>
            <Item.Group divided>
            {activities.map((activity: Activity) =>
                (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as="a">{activity.title}</Item.Header>
                        <Item.Meta>{activity.dateTime.toString()}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated="right" content="View" color="blue"></Button>
                            <Label basic content={activity.category}></Label>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}
            </Item.Group>
        </Segment>

    );
}