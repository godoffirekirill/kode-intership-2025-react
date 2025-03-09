import React, { useState } from "react";
import { TextField, Box, Modal, FormControl, FormControlLabel, Radio, RadioGroup, Typography, IconButton, InputAdornment, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks.ts";
import { AppDispatch, RootState } from "../../redux/store.ts";
import { setSearchQuery, setSortFilter } from "../../redux/slices/contentSlice.ts";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";

const Search: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { searchQuery, sortFilter } = useAppSelector((state: RootState) => state.users);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const { t } = useTranslation();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        dispatch(setSearchQuery(query));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as "alphabet" | "birthday";
        dispatch(setSortFilter(value));
    };

    return (
        <Box
            sx={{
                width: "100%",
                p: 1,
                bgcolor: theme.palette.background.default,
                position: "fixed",
                top: 0,
                zIndex: 1200,
                mb: 0,
            }}
        >
            <Typography
                sx={{
                    fontWeight: "bold",
                    margin: 1,
                    padding: 0,
                    color: theme.palette.text.primary,
                }}
            >
                Search
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    maxWidth: "1200px",
                    minWidth: "320px",
                    mx: "auto",
                    width: "100%",
                    boxSizing: "border-box",
                }}
            >
                <TextField
                    label={t("search.placeholder")}
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearch}
                    sx={{
                        width: "100%",
                        bgcolor: theme.palette.background.default,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                            fontFamily: "inherit",
                            pr: 0,
                            height: "30px",
                        },
                        "& .MuiInputLabel-outlined": {
                            transform: "translate(14px, 8px) scale(1)",
                            color: theme.palette.text.secondary,
                            "&.MuiInputLabel-shrink": {
                                transform: "translate(14px, -6px) scale(0.75)",
                            },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.divider,
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleOpen} sx={{ p: "10px", color: theme.palette.text.primary }}>
                                    <MenuIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: theme.palette.text.secondary,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" gutterBottom>
                        {t("sort.by")}
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup value={sortFilter} onChange={handleSortChange}>
                            <FormControlLabel value="alphabet" control={<Radio />} label={t("sort.alphabet")} />
                            <FormControlLabel value="birthday" control={<Radio />} label={t("sort.birthday")} />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Modal>
        </Box>
    );
};

export default Search;