import { RouteObject, createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboards/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                element: <RequireAuth></RequireAuth>,
                children: [{
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
                },
                {
                    path: "profile/:username",
                    element: <ProfilePage/>
                },
                {
                    path: "login",
                    element: <LoginForm></LoginForm>
                },
                {
                    path: "errors",
                    element: <TestErrors/>
                }]
            },
            {
                path: "not-found",
                element: <NotFound/>
            },
            {
                path: "server-error",
                element: <ServerError/>
            },
            {
                path: "*",
                element: <Navigate replace to="/not-found"/>
            }
        ]
    }
];

export const router = createBrowserRouter(routes);