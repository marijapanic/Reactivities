import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const sleep = (delay: number) =>
{
    return new Promise(resolve => setTimeout(resolve, delay));
}

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.response.use(async (response) => 
{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
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
    details: async (id: string) => await requests.get<Activity>(`/activity/${id}`),
    create: async (activity: Activity) => await requests.post<void>(`/activities`, activity),
    update: async (activity: Activity) => await requests.put<void>(`/activities/${activity.id}`, activity),
    delete: async (id: string) => await requests.delete<void>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;