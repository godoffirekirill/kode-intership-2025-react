import {createTheme} from "@mui/material";

export type User = {
    id: string,
    avatarUrl: string,
    firstName: string,
    lastName: string,
    userTag: string,
    department: string,
    position: string,
    birthday: string,
    phone: string
}

export type RouteType = {
    path: Paths,
    title: string
    roles: Roles
}


export enum Paths {
    HOME = '/',
    ANDROID = 'android',
    IOS = 'ios',
    DESIGNERS = 'designers',
    MANAGERS = 'managers',
    QA = 'qa',
    BACK_OFFICE = 'backoffice',
    FRONTEND = 'frontend',
    HR = 'hr',
    PR = 'pr',
    BACKEND = 'backend',
    SUPPORT = 'support',
    ANALYSTS = 'analysis',
}


export enum Roles {
    ALL = 'all',
    ANDROID = 'android',
    IOS = 'ios',
    DESIGNERS = 'design',
    MANAGERS = 'management',
    QA = 'qa',
    BACK_OFFICE = 'back_office',
    FRONTEND = 'frontend',
    HR = 'hr',
    PR = 'pr',
    BACKEND = 'backend',
    SUPPORT = 'support',
    ANALYSTS = 'analysis',
}
export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#747bff",
            contrastText: "#000000",
        },
        background: {
            default: "#ffffff",
            paper: "#f5f5f5",
        },
        text: {
            primary: "#000000",
            secondary: "#666666",
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#747bff",
            contrastText: "#000000",
        },
        background: {
            default: "#121212",
            paper: "#242424",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0b0b0",
        },
    },
});