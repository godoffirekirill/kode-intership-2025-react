import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store.ts';
import { useAppSelector } from '../redux/hooks.ts';
import { userAction } from '../redux/slices/contentAction.ts';
import { clearError } from '../redux/slices/contentSlice.ts';
import { Roles, RouteType } from '../until/types.ts';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Typography, Snackbar, Alert } from '@mui/material';
import { useTranslation } from "react-i18next";

type Props = {
    items: RouteType[];
};

const UserList: React.FC<Props> = ({ items }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { filteredUsers, loading, error } = useAppSelector((state: RootState) => state.users);
    const { t } = useTranslation();
    const [avatarErrors, setAvatarErrors] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const selectedRole = items[0]?.roles || Roles.ALL;
        dispatch(userAction(selectedRole));
    }, [dispatch, items]);

    const handleAvatarError = (userId: string) => {
        setAvatarErrors((prev) => ({ ...prev, [userId]: true }));
    };

    const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickable') {
            return; // Prevents closing when clicking outside
        }
        dispatch(clearError());
    };

    const fallbackImage = '/src/assets/Rectangle 191.svg';

    return (
        <>
            <Box
                sx={{
                    mt: -2,
                    p: 2,
                    pb: 4,
                    width: '100%',
                    maxWidth: '1200px',
                    minWidth: '320px',
                    mx: 'auto',
                    boxSizing: 'border-box',
                    overflowX: 'auto',
                }}
            >
                <List sx={{ width: '100%' }}>
                    {loading ? (
                        Array.from(new Array(5)).map((_, index) => (
                            <ListItem key={index} sx={{ py: 1 }}>
                                <ListItemAvatar>
                                    <Skeleton variant='circular' width={40} height={40} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Skeleton variant='text' width='60%' />}
                                    secondary={<Skeleton variant='text' width='30%' />}
                                />
                            </ListItem>
                        ))
                    ) : filteredUsers.length === 0 ? (
                        <Typography sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                            {t("nothing.found")}
                        </Typography>
                    ) : (
                        filteredUsers.map((user) => (
                            <ListItem
                                key={user.id}
                                onClick={() => navigate(`/users/${user.id}`)}
                                sx={{
                                    cursor: 'pointer',
                                    width: '100%',
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt={user.firstName}
                                        src={avatarErrors[user.id] ? fallbackImage : user.avatarUrl}
                                        onError={() => handleAvatarError(user.id)}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${user.firstName} ${user.lastName}`}
                                    secondary={user.department}
                                    sx={{
                                        '& .MuiListItemText-primary': { color: 'black' },
                                        '& .MuiListItemText-secondary': { color: 'gray' },
                                    }}
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </Box>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error ? t(`error.${error === "Request failed with status code 404" ? "404" : "unknown"}`) : ""}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UserList;