import { useState, SyntheticEvent } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Prop
{
    activities: Activity[];
    submitting: boolean;
    selectSelectActivity: (id:string) => void;
    deleteActivity: (id: string ) => void;
}

export default function ActivityList(prop : Prop)
{
    const {activities, submitting, selectSelectActivity, deleteActivity} = prop;
    const [target, setTarget] = useState("");

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
     setTarget(e.currentTarget.name); 
     deleteActivity(id);
    }
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
                            <Button
                                onClick={() => selectSelectActivity(activity.id)}
                                floated="right"
                                content="View"
                                color="blue"></Button>
                            <Button
                                name={activity.id}
                                loading={submitting && target === activity.id}
                                onClick={e => handleActivityDelete(e, activity.id)}
                                floated="right"
                                content="Delete"
                                color="red"></Button>
                            <Label basic content={activity.category}></Label>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}
            </Item.Group>
        </Segment>

    );
}