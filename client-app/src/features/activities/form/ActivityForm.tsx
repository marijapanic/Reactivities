import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
}

export default function ActivityForm({activity, closeForm} : Props)
{
    const [title, setTitle] = useState<string>(activity ? activity.title : "");
    const [category, setCategory] = useState<string>(activity ? activity.category : "");
    const [date, setDate] = useState<Date>(activity ? activity.dateTime : new Date());
    const [city, setCity] = useState<string>(activity ? activity.city : "");
    const [venue, setVenue] = useState<string>(activity ? activity.venue : "");


    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title"></Form.Input>
                <Form.TextArea placeholder="Description"></Form.TextArea>
                <Form.Input placeholder="Category"></Form.Input>
                <Form.Input placeholder="Date"></Form.Input>
                <Form.Input placeholder="City"></Form.Input>
                <Form.Input placeholder="Venue"></Form.Input>
                <Button floated="right" positive type="submit" content="Submit"></Button>
                <Button onClick={closeForm} floated="right" type="button" content="Cancel"></Button>
            </Form>
        </Segment>
    );
}