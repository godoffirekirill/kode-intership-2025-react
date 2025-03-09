import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Roles } from "../../until/types.ts";

const baseUrl = "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users";

export const userAction = createAsyncThunk<User[], Roles>(
    "users/fetchUsers",
    async (param: Roles, { rejectWithValue }) => {
        try {
            const options = {
                method: "GET",
                url: baseUrl,
                params: { __example: param },
                headers: { Accept: "application/json, application/xml" },
            };
            const { data } = await axios.request(options);
            const users = data.items as User[];

            localStorage.setItem("users", JSON.stringify(users));
            return users;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.message === "Network Error") {
                    const cachedUsers = localStorage.getItem("users");
                    if (cachedUsers) {
                        return JSON.parse(cachedUsers) as User[];
                    }
                }
                return rejectWithValue(error.message);
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);