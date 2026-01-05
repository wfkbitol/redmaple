import "./src/styles/global.scss"
import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from "./src/assets/locales/en.json"
import zh from './src/assets/locales/zh.json'

export const onClientEntry = () => {
  i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            zh: {
                translation: zh
            }
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        }
    });
}


    