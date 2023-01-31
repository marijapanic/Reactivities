import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboards/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "activities",
                element: <ActivityDashboard></ActivityDashboard>
            },
            {
                path: "activities/:id",
                element: <ActivityDetails />
            },
            {
                path: "createActivity",
                element: <ActivityForm key="create"></ActivityForm>
            },
            {
                path: "manage/:id",
                element: <ActivityForm key="manage"/>
            }
        ]
    }
];

export const router = createBrowserRouter(routes);