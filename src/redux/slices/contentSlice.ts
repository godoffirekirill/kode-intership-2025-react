import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userAction } from "./contentAction.ts";
import { User } from "../../until/types.ts";

interface UsersState {
    users: User[];
    filteredUsers: User[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    sortFilter: "alphabet" | "birthday";
}

// Функция для получения начального состояния из localStorage
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
            const filtered = state.users.filter(user =>
                `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())
            );
            state.filteredUsers = sortUsers(filtered, state.sortFilter);
            // Сохраняем состояние в localStorage
            localStorage.setItem("usersState", JSON.stringify(state));
        },
        setSortFilter: (state, action: PayloadAction<"alphabet" | "birthday">) => {
            state.sortFilter = action.payload;
            state.filteredUsers = sortUsers(state.filteredUsers, action.payload);
            // Сохраняем состояние в localStorage
            localStorage.setItem("usersState", JSON.stringify(state));
        },
        clearError: (state) => {
            state.error = null;
            // Сохраняем состояние в localStorage
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
                    ? action.payload.filter(user =>
                        `${user.firstName} ${user.lastName}`
                            .toLowerCase()
                            .includes(state.searchQuery.toLowerCase())
                    )
                    : action.payload;
                state.filteredUsers = sortUsers(filtered, state.sortFilter);
                // Сохраняем состояние в localStorage
                localStorage.setItem("usersState", JSON.stringify(state));
            })
            .addCase(userAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
                // Сохраняем состояние в localStorage
                localStorage.setItem("usersState", JSON.stringify(state));
            });
    },
});

export const { setSearchQuery, setSortFilter, clearError } = usersSlice.actions;
export const userReducer = usersSlice.reducer;