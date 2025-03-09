import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import {darkTheme, lightTheme, Paths, RouteType} from "./until/types.ts";
import Navigator from "./components/navigation/Navigator.tsx";
import { navItems } from "./components/navigation/nav-config.ts";
import UserList from "./components/UserList.tsx";
import UserDetails from "./components/UserDetails.tsx";
import Search from "./components/navigation/Search.tsx";
import {Box, ThemeProvider, useMediaQuery} from "@mui/material";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ErrorPage from "./components/servicePages/ErrorPage.tsx";
import './localization/i18n.ts'
function App() {
    const location = useLocation();
    const isUserDetailsPage = location.pathname.startsWith("/users/");
    const navigate = useNavigate();
    useEffect(() => {
        if(location.pathname === '/error')
            navigate('/')
    })

    const filterNavItems = (path: Paths): RouteType[] => {
        return navItems.filter(item => item.path === path);
    };

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}><Box sx={{margin: 0, padding: 0, minHeight: "100vh", width: "100%", boxSizing: "border-box"}}>
            {!isUserDetailsPage && <Search/>}
            <Navigator items={navItems}/>
            <Routes>
                <Route path={Paths.HOME} element={<UserList items={filterNavItems(Paths.HOME)}/>}/>
                <Route path={Paths.DESIGNERS} element={<UserList items={filterNavItems(Paths.DESIGNERS)}/>}/>
                <Route path={Paths.ANALYSTS} element={<UserList items={filterNavItems(Paths.ANALYSTS)}/>}/>
                <Route path={Paths.MANAGERS} element={<UserList items={filterNavItems(Paths.MANAGERS)}/>}/>
                <Route path={Paths.IOS} element={<UserList items={filterNavItems(Paths.IOS)}/>}/>
                <Route path={Paths.QA} element={<UserList items={filterNavItems(Paths.QA)}/>}/>
                <Route path={Paths.BACK_OFFICE} element={<UserList items={filterNavItems(Paths.BACK_OFFICE)}/>}/>
                <Route path={Paths.FRONTEND} element={<UserList items={filterNavItems(Paths.FRONTEND)}/>}/>
                <Route path={Paths.HR} element={<UserList items={filterNavItems(Paths.HR)}/>}/>
                <Route path={Paths.PR} element={<UserList items={filterNavItems(Paths.PR)}/>}/>
                <Route path={Paths.BACKEND} element={<UserList items={filterNavItems(Paths.BACKEND)}/>}/>
                <Route path={Paths.SUPPORT} element={<UserList items={filterNavItems(Paths.SUPPORT)}/>}/>
                <Route path={Paths.ANDROID} element={<UserList items={filterNavItems(Paths.ANDROID)}/>}/>
                <Route path="/users/:id" element={<UserDetails/>}/>
                <Route path={'*'} element={<ErrorPage/>}/>
            </Routes>

        </Box></ThemeProvider>
    );
}

export default App;