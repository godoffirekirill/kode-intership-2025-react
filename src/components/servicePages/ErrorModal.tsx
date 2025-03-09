import React from 'react';
import { useNavigate } from 'react-router-dom'; // Добавляем импорт useNavigate
import { Box } from '@mui/material';
import { useTranslation } from "react-i18next";
interface ErrorModalProps {
    error: string | null;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => {
    const navigate = useNavigate(); // Инициализируем navigate
    const { t } = useTranslation();
    if (!error) return null;

    const getErrorMessage = () => {
        switch (error) {
            case 'Network Error':
                return t("error.network");
            case 'Request failed with status code 404':
                return t("error.404");
            default:
                console.log(error);
                return t("error.unknown");
        }
    };

    const handleCloseAndNavigate = () => {
        onClose();
        navigate('/');
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 1,
                    maxWidth: '400px',
                    width: '90%',
                }}
            >
                <h2>{t("error.title")}</h2>
                <p>{getErrorMessage()}</p>
                <button
                    onClick={handleCloseAndNavigate}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {t("close")}
                </button>
            </Box>
        </Box>
    );
};

export default ErrorModal;