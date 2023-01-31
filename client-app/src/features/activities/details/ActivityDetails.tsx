import { observer } from "mobx-react-lite";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";


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
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
                <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
                <ActivityDetailedChat></ActivityDetailedChat>
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSidebar></ActivityDetailedSidebar>
            </GridColumn>
        </Grid>
    );
});