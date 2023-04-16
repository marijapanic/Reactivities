import { observer } from "mobx-react-lite";
import { Image, List } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
interface Prop {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({
    attendees
}: Prop)
{

    return (
        <List horizontal>
            {attendees.map(attendee =>
                <List.Item key={attendee.username} Link={`/profiles/${attendee.username}`}>
                    <Image size="mini" circular src={attendee.image || "/assets/user.png"}></Image>
                </List.Item>
            )}
        </List>
    );
});