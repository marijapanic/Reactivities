import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity, ActivityFormValues } from "../models/activity";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { Photo, Profile, UserActivity } from "../models/profile";
import { PaginatedResult } from "../models/pagination";

const sleep = (delay: number) =>
{
    return new Promise(resolve => setTimeout(resolve, delay));
}

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

axios.interceptors.response.use(async (response) => 
{
    await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
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

// axios.interceptors.request.use(config => {
//     const token = store.commonStore.token;
//     if (token && config.headers)
//     {
//         config.headers = { ...config.headers } as AxiosHeaders;
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// });

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
    list: async (params: URLSearchParams) =>
    {
       const response =  await axios.get<PaginatedResult<Activity[]>>("/activities", { params });

       return responseBody(response);
    },
    details: async (id: string) => await requests.get<Activity>(`/activities/${id}`),
    create: async (activity: ActivityFormValues) => await requests.post<void>(`/activities`, activity),
    update: async (activity: ActivityFormValues) => await requests.put<void>(`/activities/${activity.id}`, activity),
    delete: async (id: string) => await requests.delete<void>(`/activities/${id}`),
    attend: async (id: string) => await requests.post<void>(`/activities/${id}/attend`, {})
}

const Account = {
    current: async () => await requests.get<User>("/account"),
    login: async (user: UserFormValues) => await requests.post<User>("/account/login", user),
    register: async (user: UserFormValues) => await requests.post<User>("/account/register", user),
}

const Profiles = {
    get: async (username: string) => await requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    },
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowings: (username: string, predicate: string) =>
        requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) =>
        requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent;