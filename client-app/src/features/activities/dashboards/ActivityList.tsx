import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList()
{
    const { activityStore } = useStore();
    const { activitiesByDate, } = activityStore;

    return (
        <Segment>
            <Item.Group divided>
            {activitiesByDate.map((activity: Activity) =>
                (
                    <ActivityListItem key={activity.id} activity={activity}></ActivityListItem>
                ))}
            </Item.Group>
        </Segment>

    );
});