import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks.ts"; // Добавляем useAppDispatch
import { RootState, AppDispatch } from "../redux/store.ts";
import { userAction } from "../redux/slices/contentAction.ts"; // Импортируем userAction
import { Box, Typography, Avatar, Divider, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import { Roles } from "../until/types.ts"; // Импортируем Roles
import { useTranslation } from "react-i18next";

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch<AppDispatch>(); // Инициализируем dispatch
    const { users, loading } = useAppSelector((state: RootState) => state.users); // Добавляем loading
    const user = users.find((u) => u.id === id);
    const theme = useTheme();
    const { t } = useTranslation();
    useEffect(() => {
        if (!users.length && !loading) {
            dispatch(userAction(Roles.ALL));
        }
    }, [dispatch, users.length, loading]);

    if (loading) {
        return <Typography>{t("loading")}</Typography>;
    }

    if (!user) {
        return <Typography>{t("user.not.found")}</Typography>;
    }

    return (
        <Box
            sx={{
                mt: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                minHeight: "100vh",
                width: "100%",
                maxWidth: "1200px",
                mx: "auto",
                boxSizing: "border-box",
            }}
        >


            <Avatar
                src={user.avatarUrl}
                alt={user.firstName}
                sx={{ width: 100, height: 100, mb: 2 }}
            />

            <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
                {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2">{user.department}</Typography>

            <Divider sx={{ width: "100%", my: 2 }} />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "1200px",
                    mt: 2,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <StarIcon sx={{ color: theme.palette.text.secondary, fontSize: "18px" }} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {user.birthday}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PhoneIcon sx={{ color: theme.palette.text.secondary, fontSize: "18px" }} />
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                            }}
                            component="a"
                            href={`tel:${user.phone}`}
                        >
                            {user.phone}
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {user.userTag}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UserDetails;