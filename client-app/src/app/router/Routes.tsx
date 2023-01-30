import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App></App>
    }
];

export const router = createBrowserRouter(routes);