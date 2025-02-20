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

export const ExportUsersApi = async (params: { search_text?: string, registration_date?: string, subscription_date?: string, status?: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/admin/users/export", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params,
            responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

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

export const flagBusinessApi = async (json: { business_id: string, status: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.put("/admin/merchant/flag", json, {
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

export const fetchBusinessesApi = async (json: { pageNumber: number, search_text?: string, subscription_date?: string, registration_date?: string, status?: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/admin/business", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json
        })

        cb(response?.data)
    } catch (error: any) {
        console.log("fetch businesses error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const ExportBusinessesApi = async (json: { search_text?: string, subscription_date?: string, registration_date?: string, status?: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/admin/business/export", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json,
            responseType: "blob",
        })

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error: any) {
        console.log("fetch businesses error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const fetchBusinessesDetailsApi = async (json: { business_id: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/admin/business/detail", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json
        })

        cb(response?.data)
    } catch (error: any) {
        console.log("fetch business details error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const fetchBusinessesRedeemedDealsApi = async (json: { business_id: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await axiosInstance.get("/admin/business/deal_redemptions", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json
        })

        cb(response?.data)
    } catch (error: any) {
        console.log("fetch business redeemed deal error", error.message)
        cb(error?.response?.data || { error: true, message: "An error occured" })
    }
}

export const getCoordinateApi = async (place_id: string, cb: (param: any) => void) => {
    try {
        const response = await axiosInstance.post("/business/coordinate", {
            place_id
        })

        cb(response?.data || response)
    } catch (error: any) {
        console.log("get coordinate error", error.message)
        return {
            error: true,
            message: error?.response?.data
        }
    }
}

export const fetchDealDraftApi = async (cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get("/admin/deals/draft", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        cb(response?.data || response)
    } catch (error: any) {
        console.log("error", error?.response?.data)
        cb(error.response.data)
    }
}

export const fetchDealsApi = async (json: { page_number: number, status: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get("/admin/deals", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json
        })

        cb(response?.data || response)
    } catch (error: any) {
        console.log("error", error?.response?.data)
        cb(error.response.data)
    }
}

export const ExportDealsApi = async (json: { status: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get("/admin/deal/export", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json,
            responseType: "blob"
        })

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error: any) {
        console.log("error", error?.response?.data)
        cb(error.response.data)
    }
}

export const FetchRolesNPermissionsApi = async (json: { pageNumber: number, status: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get("/admin", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json
        })

        cb(response?.data || response);
    } catch (error: any) {
        console.log("error", error?.response?.data)
        cb(error.response.data)
    }
}

export const InviteAdminApi = async (json: { email: string, role: string }, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.post("/admin/invite", json, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        cb(response?.data || response);
    } catch (error: any) {
        console.log("error", error?.response?.data)
        cb(error.response.data)
    }
}

export const DeleteAdmin = async (id: number, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.delete(`/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        cb(response?.data || response);
    } catch (error: any) {
        console.log(error.message)
        cb(error.response.data)
    }
}

export const AcceptAdminInviteApi = async (FormData: any, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.post(`/admin/invite/accept`, FormData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        cb(response?.data || response);
    } catch (error: any) {
        console.log(error.message)
        cb(error.response.data)
    }
}

export const FetchAdminApi = async (params: any, cb: (param: any) => void) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get(`/fetchadmin`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params
        })

        cb(response?.data || response);
    } catch (error: any) {
        console.log(error.message)
        cb(error.response.data)
    }
}

export const FetchAppCategories = (cb: (response?: any) => void) => {

    axiosInstance
        .get(`${BASE_URL_DEV}/categories`)
        .then((response) => {
            cb(response.data);
        })
        .catch((error) => {
            console.error(error);
            cb(error.response?.data);
        });
}

export const UpdateAppSegment = (json: any, cb: (response: any) => void) => {
    const token = localStorage.getItem("authToken");

    axiosInstance
        .put(`${BASE_URL_DEV}/admin/appsegments`, json, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            cb(response.data);
        })
        .catch((error) => {
            console.error(error);
            cb(error.response?.data);
        });
}

export const fetchChatsApi = (json: any, cb: (response: any) => void) => {
    const token = localStorage.getItem("authToken");

    axiosInstance
        .get(`${BASE_URL_DEV}/admin/chats`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: json
        })
        .then((response) => {
            cb(response.data);
        })
        .catch((error) => {
            console.error(error);
            cb(error.response?.data);
        });
}

export const FetchAnalyticsData = async () => {
    const token = localStorage.getItem("authToken");

    try {
        const response = await axiosInstance.get(`${BASE_URL_DEV}/analytics`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}