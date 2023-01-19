import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Prop
{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    editMode: Boolean;
    submitting: boolean;
    selectSelectActivity: (id:string) => void;
    cancelSelectActivity: () => void;
    openForm: (id: string ) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string ) => void;
}

export default function ActivityDashboard(prop : Prop)
{
    const {
        activities,
        selectedActivity,
        editMode,
        submitting,
        selectSelectActivity,
        cancelSelectActivity,
        openForm,
        closeForm,
        createOrEdit,
        deleteActivity
    } = prop;

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList
                    activities={activities}
                    submitting={submitting}
                    selectSelectActivity={selectSelectActivity}
                    deleteActivity={deleteActivity}></ActivityList>
            </Grid.Column>
            
            <Grid.Column width="6">
                {selectedActivity && !editMode ?
                <ActivityDetails
                    activity={selectedActivity}
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}></ActivityDetails> : ``} 
                {editMode && 
                <ActivityForm
                    activity={selectedActivity}
                    submitting={submitting}
                    closeForm={closeForm}
                    createOrEdit={createOrEdit}></ActivityForm>
                }
            </Grid.Column>
        </Grid>
    );
}