// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Файлы переводов
const resources = {
    en: {
        translation: {
            "search.placeholder": "Enter name, tag, email...",
            "sort.by": "Sort by",
            "sort.alphabet": "Alphabet",
            "sort.birthday": "Birthday",
            "loading": "Loading...",
            "user.not.found": "User not found",
            "nothing.found": "Nothing found",
            "error.title": "Error",
            "error.network": "Network issues. Please check your internet connection.",
            "error.404": "Data not found. Server returned a 404 error.",
            "error.unknown": "An unknown error occurred.",
            "close": "Close",
            "home" : 'ALL',
            "android" : 'Android',
            "ios" : 'IOS',
            "designers" : 'Designers',
            "managers" : 'Managers',
            "qa" : 'qa',
            "back_office" : 'Back office',
            "frontend" : 'Frontend',
            "hr" : 'HR',
            "pr" : 'PR',
            "backend" : 'Backend',
            "support" : 'Support',
            "analysts" : 'Analysis',
            "search": "Search"


        },
    },
    ru: {
        translation: {

            "search.placeholder": "Введите имя, тег, email...",
            "sort.by": "Сортировать по",
            "sort.alphabet": "Алфавиту",
            "sort.birthday": "Дате рождения",
            "loading": "Загрузка...",
            "user.not.found": "Пользователь не найден",
            "nothing.found": "Ничего не найдено",
            "error.title": "Ошибка",
            "error.network": "Проблемы с сетью. Проверьте подключение к интернету.",
            "error.404": "Данные не найдены. Сервер вернул ошибку 404.",
            "error.unknown": "Произошла неизвестная ошибка.",
            "close": "Закрыть",
            "home": "Все",
            "android": "Андроид",
            "ios": "iOS",
            "designers": "Дизайнеры",
            "managers": "Менеджеры",
            "qa": "Тестировщики",
            "back_office": "Бэк-офис",
            "frontend": "Фронтенд",
            "hr": "Кадры",
            "pr": "Пиар",
            "backend": "Бэкенд",
            "support": "Поддержка",
            "analysts": "Аналитики",
            "search": "Поиск"
        },
    },
};

i18n
    .use(LanguageDetector) // Автоматическое определение языка
    .use(initReactI18next) // Интеграция с React
    .init({
        resources,
        fallbackLng: "en", // Язык по умолчанию, если перевод отсутствует
        interpolation: {
            escapeValue: false, // React уже экранирует значения
        },
        detection: {
            order: ["localStorage", "navigator"], // Сначала проверяем localStorage, затем язык браузера
            caches: ["localStorage"], // Сохраняем выбранный язык в localStorage
        },
    });

export default i18n;