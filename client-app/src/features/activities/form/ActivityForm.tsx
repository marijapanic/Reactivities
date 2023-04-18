import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";

export default observer(function ActivityForm()
{
    const { activityStore } = useStore();
    const {
        createActivity,
        updateActivity,
        loadActivity,
        loadingInitial
    } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required("The title is requeried TextInput."),
        description: Yup.string().required("The description is requeried TextInput."),
        category: Yup.string().required(),
        dateTime: Yup.string().required('Date is required'),
        city: Yup.string().required(),
        venue: Yup.string().required()
    });

    useEffect(() =>
    {
        if (id)
        {
            loadActivity(id)
            .then(activity => setActivity(new ActivityFormValues(activity)));
        }
    }, [id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues)
    {
        if (activity.id)
        {
            updateActivity(activity)
            .then(()=>
            {
                navigate(`/activities/${activity.id}`);
            });
        }
        else
        {
            activity.id = uuid();
            createActivity(activity)
            .then(()=>
            {
                navigate(`/activities/${activity.id}`);
            });
        }
    }

    if (loadingInitial) return <LoadingComponent></LoadingComponent>

    return (
        <Segment clearing>
            <Header content="Activity details" sub color="teal"></Header>
            <Formik
                enableReinitialize
                initialValues={activity}
                validationSchema={validationSchema}
                onSubmit={value => handleFormSubmit(value)}>
                {({ handleSubmit, isSubmitting, isValid, dirty}) =>
                (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <TextInput placeholder="Title" name="title"></TextInput>
                        <TextArea  rows={3} placeholder="Description" name="description"></TextArea>
                        <SelectInput options={categoryOptions} placeholder="Category" name="category"></SelectInput>
                        <DateInput
                            placeholderText="Date"
                            name="dateTime"
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM dd, yyyy h:mm aa">
                        </DateInput>
                        <Header content="Activity Location" sub color="teal"></Header>
                        <TextInput placeholder="City" name="city"></TextInput>
                        <TextInput placeholder="Venue" name="venue"></TextInput>
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}
                            loading={isSubmitting}
                            floated="right"
                            positive
                            type="submit"
                            content="Submit"></Button>
                        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel"></Button>
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});