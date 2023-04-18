import { observer } from "mobx-react-lite";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";
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

                <Popup
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item key={attendee.username} Link={`/profiles/${attendee.username}`}>
                            <Image size="mini" circular src={attendee.image || "/assets/user.png"}></Image>
                        </List.Item>
                    }>

                    <Popup.Content>
                        <ProfileCard profile={attendee}></ProfileCard>
                    </Popup.Content>
                </Popup>
            )}
        </List>
    );
});