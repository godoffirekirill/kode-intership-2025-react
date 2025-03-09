import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AppBar, Box, Tab, Tabs, useTheme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RouteType } from "../../until/types.ts";
import { useTranslation } from "react-i18next";

type Props = {
    items: RouteType[];
};

const Navigator: React.FC<Props> = ({ items }) => {
    const [value, setValue] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation();

    const isUserDetailsPage = location.pathname.startsWith("/users/");

    useEffect(() => {
        const currentIndex = items.findIndex(item => item.path === location.pathname);
        if (currentIndex !== -1) {
            setValue(currentIndex);
        }
    }, [location.pathname, items]);

    const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            {isUserDetailsPage && (
                <Box
                    sx={{
                        width: "100%",
                        position: "fixed",
                        top: 0,
                        zIndex: 1200,
                        bgcolor: theme.palette.background.default,
                    }}
                >
                    <AppBar
                        position="static"
                        sx={{
                            width: "100%",
                            backgroundColor: "inherit",
                            boxShadow: "none",
                        }}
                    >
                        <Tabs value={false}>
                            <Tab
                                icon={<ArrowBackIosIcon />}
                                onClick={() => navigate(-1)}
                                sx={{
                                    textTransform: "none",
                                    minWidth: "auto",
                                    px: 2,
                                    color: theme.palette.text.secondary,
                                }}
                            />
                        </Tabs>
                    </AppBar>
                </Box>
            )}

            {!isUserDetailsPage && (
                <Box sx={{ mt: "90px" }}>
                    <AppBar
                        position="static"
                        sx={{
                            width: "100%",
                            bgcolor: theme.palette.background.default,
                            boxShadow: "none",
                            mt: 0,
                            mb: 0,
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                "& .MuiTabs-flexContainer": {
                                    justifyContent: "flex-start",
                                },
                                "& .MuiTabs-scroller": {
                                    overflowX: "auto !important",
                                },
                                "& .MuiTabs-indicator": {
                                    height: "2px",
                                    backgroundColor: theme.palette.primary.main,
                                },
                            }}
                        >
                            {items.map((item, index) => (
                                <Tab
                                    key={index}
                                    component={Link}
                                    to={item.path}
                                    label={t(`${item.title}`)}
                                    role={item.roles}
                                    sx={{
                                        textTransform: "none",
                                        minWidth: "auto",
                                        px: 2,
                                        color: theme.palette.text.secondary,
                                        "&.Mui-selected": {
                                            color: theme.palette.primary.main,
                                        },
                                    }}
                                />
                            ))}
                        </Tabs>
                    </AppBar>
                </Box>
            )}
        </>
    );
};

export default Navigator;