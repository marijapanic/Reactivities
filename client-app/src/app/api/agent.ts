import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
import { router } from "../router/Routes";
import { store } from "../stores/store";

const sleep = (delay: number) =>
{
    return new Promise(resolve => setTimeout(resolve, delay));
}

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.response.use(async (response) => 
{
    await sleep(1000);
    return response;
}, (error: AxiosError) =>
{
    const { data, status, config } = error.response as AxiosResponse;

    switch(status)
    {
        case 400:
            if (config.method === "get" && data.errors.hasOwnProperty("id"))
            {
                router.navigate("/not-found");
            }
            if (data.errors)
            {
                const modalStateErrors = [];
                for (const key in data.errors)
                {
                    if (data.errors[key])
                    {
                        modalStateErrors.push(data.errors[key]);
                    }
                }

                throw(modalStateErrors);
            }
            else
                toast.error(data);
            break;
        case 401:
            toast.error("Unauthorized");
            break;
        case 403:
            toast.error("forbidden");
            break;
        case 404:
            router.navigate("/not-found");
            break;
        case 500:
            toast.error("server error");
            break;
        default:
            store.commonStore.setServerError(data);
            router.navigate("/server-error")
            break;
    }

    return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: async <T> (url: string) =>
    {
       const response = await axios.get<T>(url);
       return responseBody(response);
    },
    post: async <T> (url: string, body: {}) =>
    {
        const response = await axios.post<T>(url, body)
        return responseBody(response);
    },
    put: async <T> (url: string, body: {}) =>
    {
        const response = await axios.put<T>(url, body)
        return responseBody(response);
    },
    delete: async <T> (url: string) =>
    {
        const response = await axios.delete<T>(url);
        return responseBody(response);
    },
}

const Activities = {
    list: async () => await requests.get<Activity[]>("/activities"),
    details: async (id: string) => await requests.get<Activity>(`/activities/${id}`),
    create: async (activity: Activity) => await requests.post<void>(`/activities`, activity),
    update: async (activity: Activity) => await requests.put<void>(`/activities/${activity.id}`, activity),
    delete: async (id: string) => await requests.delete<void>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;