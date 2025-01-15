import { BASE_URL_DEV } from "@/helper/variables";
import axios from "axios";
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    baseURL: BASE_URL_DEV,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const signUpApi = async (json: any, cb: (param: any) => void) => { }

export const SignInApi = async (json: { email: string, password: string }, cb: (param: any) => void) => {
    try {
        const response = await axiosInstance.post("/admin/login", json)

        const token = response.data.token;

        localStorage.setItem("authToken", token);

        Cookies.set('token', token, { expires: 7, path: '/' });

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        cb(response?.data)

    } catch (error: any) {
        console.log("error", error?.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const sendResetPasswordOtpApi = async (json: { email: string }, cb: (param: any) => void) => {
    try {
        const response = await axiosInstance.post("/admin/password_reset_url", json)

        cb(response?.data)

    } catch (error: any) {
        console.log("error", error?.response?.data)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const resetPasswordApi = async (json: any, cb: (param: any) => void) => {
    try {
        const response = await axiosInstance.post("/admin/resetpassword", json)

        cb(response?.data)

    } catch (error: any) {
        console.log("error", error?.response?.data)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const fetchUsersApi = async (params: { pageNumber: number, search_text?: string, registration_date?: string, subscription_date?: string, status?: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params
        })

        cb(response?.data)
    } catch (error: any) {
        console.log("fetch users error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const fetchUserDeatailsApi = async (params: { user_id: any }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/admin/user", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: params
        })

        cb(response?.data)
    } catch (error: any) {
        console.log("dashobard error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const flagUserApi = async (json: { user_id: number, status: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.put("/admin/user/flag", json, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        cb(response?.data)
    } catch (error: any) {
        console.log("flag user error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const fetchUserRedemptionApi = async (json: { user_id: number, pageNumber: number }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/user/redemption/history", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json
        })

        cb(response?.data)
    } catch (error: any) {
        console.log("fetch user redemption error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const fetchUserActivityApi = async (json: { userId: string, fromDate: string, toDate: string, page: number }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/admin/user/activities", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json
        })

        cb(response?.data)
    } catch (error: any) {
        console.log("fetch user activity error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}