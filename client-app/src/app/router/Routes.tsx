import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/activities/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboards/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "",
                element: <HomePage></HomePage>
            },
            {
                path: "activities",
                element: <ActivityDashboard></ActivityDashboard>
            },
            {
                path: "activities/:id",
                element: <ActivityDetails />
            },
            {
                path: "manage/:id",
                element: <ActivityForm />
            },
            {
                path: "createActivity",
                element: <ActivityForm></ActivityForm>
            }
        ]
    }
];

export const router = createBrowserRouter(routes);