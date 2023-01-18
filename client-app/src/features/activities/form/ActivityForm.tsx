import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit} : Props)
{
    // const [title, setTitle] = useState<string>(activity ? activity.title : "");
    // const [description, setDescription] = useState<string>(activity ? activity.description : "");
    // const [category, setCategory] = useState<string>(activity ? activity.category : "");
    // const [date, setDate] = useState<Date>(activity ? activity.dateTime : new Date());
    // const [city, setCity] = useState<string>(activity ? activity.city : "");
    // const [venue, setVenue] = useState<string>(activity ? activity.venue : "");
    const initialState = selectedActivity ?? {
        id:"",
        title:"",
        description: "",
        category: "",
        dateTime: new Date(),
        city: "",
        venue: ""
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit()
    {
        console.log(activity);
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input
                    placeholder="Title"
                    value={activity.title}
                    name="title"
                    onChange={handleInputChange}>
                </Form.Input>
                <Form.TextArea
                    placeholder="Description"
                    value={activity.description}
                    name="description"
                    onChange={handleInputChange}></Form.TextArea>
                <Form.Input
                    placeholder="Category"
                    value={activity.category}
                    name="category"
                    onChange={handleInputChange}></Form.Input>
                <Form.Input
                    placeholder="Date"
                    value={activity.dateTime}
                    name="dateTime"
                    onChange={handleInputChange}></Form.Input>
                <Form.Input
                    placeholder="City"
                    value={activity.city}
                    name="city"
                    onChange={handleInputChange}></Form.Input>
                <Form.Input
                    placeholder="Venue"
                    value={activity.venue}
                    name="venue"
                    onChange={handleInputChange}></Form.Input>
                <Button onClick={handleSubmit} floated="right" positive type="submit" content="Submit"></Button>
                <Button onClick={closeForm} floated="right" type="button" content="Cancel"></Button>
            </Form>
        </Segment>
    );
}