import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userAction } from "./contentAction.ts"; // Assuming this is the correct import; adjust if it's "./userAction.ts"
import { User } from "../../until/types.ts";

interface UsersState {
    users: User[];
    filteredUsers: User[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    sortFilter: "alphabet" | "birthday";
}

// Function to get initial state from localStorage
const getInitialState = (): UsersState => {
    const cachedState = localStorage.getItem("usersState");
    if (cachedState) {
        return JSON.parse(cachedState);
    }
    return {
        users: [],
        filteredUsers: [],
        loading: false,
        error: null,
        searchQuery: "",
        sortFilter: "alphabet",
    };
};

const initialState: UsersState = getInitialState();

const sortUsers = (users: User[], sortFilter: "alphabet" | "birthday"): User[] => {
    return [...users].sort((a, b) => {
        if (sortFilter === "alphabet") {
            return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        }
        return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
    });
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            const filtered = state.users.filter((user) =>
                `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())
            );
            state.filteredUsers = sortUsers(filtered, state.sortFilter);
            localStorage.setItem("usersState", JSON.stringify(state));
        },
        setSortFilter: (state, action: PayloadAction<"alphabet" | "birthday">) => {
            state.sortFilter = action.payload;
            state.filteredUsers = sortUsers(state.filteredUsers, action.payload);
            localStorage.setItem("usersState", JSON.stringify(state));
        },
        clearError: (state) => {
            state.error = null;
            localStorage.setItem("usersState", JSON.stringify(state));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userAction.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                const filtered = state.searchQuery
                    ? action.payload.filter((user) =>
                        `${user.firstName} ${user.lastName}`
                            .toLowerCase()
                            .includes(state.searchQuery.toLowerCase())
                    )
                    : action.payload;
                state.filteredUsers = sortUsers(filtered, state.sortFilter);
                localStorage.setItem("usersState", JSON.stringify(state));
            })
            .addCase(userAction.rejected, (state, action) => {
                state.loading = false;
                // Log both action.payload and action.error for debugging
                console.log("Rejected payload:", action.payload);
                console.log("Rejected error:", action.error);
                // Use action.payload if available (from rejectWithValue), otherwise fall back to action.error.message
                state.error = (action.payload as string) || action.error.message || "Failed to fetch users";
                localStorage.setItem("usersState", JSON.stringify(state));
            });
    },
});

export const { setSearchQuery, setSortFilter, clearError } = usersSlice.actions;
export const userReducer = usersSlice.reducer;