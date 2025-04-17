import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store.ts';
import { useAppSelector } from '../redux/hooks.ts';
import { userAction } from '../redux/slices/contentAction.ts';
import { clearError } from '../redux/slices/contentSlice.ts';
import { Roles, RouteType } from '../until/types.ts';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Typography, Snackbar, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

import fallbackImage from '../assets/Rectangle 191.svg';

type Props = {
    items: RouteType[];
};

const UserList: React.FC<Props> = ({ items }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { filteredUsers, loading, error } = useAppSelector((state: RootState) => state.users);
    const { t } = useTranslation();

    // Инициализация avatarErrors из localStorage
    const [avatarErrors, setAvatarErrors] = useState<Record<string, boolean>>(() => {
        const savedErrors = localStorage.getItem('avatarErrors');
        return savedErrors ? JSON.parse(savedErrors) : {};
    });

    // Сохранение avatarErrors в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('avatarErrors', JSON.stringify(avatarErrors));
    }, [avatarErrors]);

    useEffect(() => {
        const selectedRole = items[0]?.roles || Roles.ALL;
        dispatch(userAction(selectedRole));
    }, [dispatch, items]);

    const handleAvatarError = (userId: string) => {
        if (!avatarErrors[userId]) {
            console.log(`Avatar error for user ${userId}`);
            setAvatarErrors((prev) => ({ ...prev, [userId]: true }));
        }
    };

    const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearError());
    };

    // Функция для проверки валидности URL
    const isValidUrl = (url: string | undefined | null): boolean => {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    console.log('fallbackImage:', fallbackImage);
    console.log('avatarErrors:', avatarErrors);

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
                                    <Skeleton variant="circular" width={40} height={40} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Skeleton variant="text" width="60%" />}
                                    secondary={<Skeleton variant="text" width="30%" />}
                                />
                            </ListItem>
                        ))
                    ) : filteredUsers.length === 0 ? (
                        <Typography sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                            {t('nothing.found')}
                        </Typography>
                    ) : (
                        filteredUsers.map((user) => {
                            const avatarSrc = isValidUrl(user.avatarUrl) && !avatarErrors[user.id] ? user.avatarUrl : fallbackImage;
                            console.log(
                                `User ${user.id}: avatarUrl = ${user.avatarUrl}, avatarError = ${avatarErrors[user.id]}, avatarSrc = ${avatarSrc}`
                            );
                            return (
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
                                            key={`${user.id}-${avatarErrors[user.id] ? 'fallback' : 'avatar'}`}
                                            alt={user.firstName}
                                            src={avatarSrc}
                                            onError={() => {
                                                console.log(`Avatar error for user ${user.id}, src = ${avatarSrc}`);
                                                handleAvatarError(user.id);
                                            }}
                                        />
                                        {/* Альтернатива: использовать img для отладки */}
                                        {/* <img
                      alt={user.firstName}
                      src={avatarSrc}
                      onError={() => {
                        console.log(`Image error for user ${user.id}, src = ${avatarSrc}`);
                        handleAvatarError(user.id);
                      }}
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                    /> */}
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
                            );
                        })
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
                    {error ? t(`error.${error === 'Request failed with status code 404' ? '404' : 'unknown'}`) : ''}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UserList;