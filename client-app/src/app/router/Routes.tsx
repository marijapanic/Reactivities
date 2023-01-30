import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/activities/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboards/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";

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
                path: "createActivity",
                element: <ActivityForm></ActivityForm>
            }
        ]
    }
];

export const router = createBrowserRouter(routes);