import React, { createContext, useContext, useState, ReactNode } from 'react';
import { en, Translations } from './translations/en';
import { zhTW } from './translations/zh';
import { zhCN } from './translations/zhCN';

export type Language = 'en' | 'zh-TW' | 'zh-CN';

interface I18nContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: Translations;
}

const translations: Record<Language, Translations> = { en, 'zh-TW': zhTW, 'zh-CN': zhCN };

const I18nContext = createContext<I18nContextType>({
    lang: 'en',
    setLang: () => { },
    t: en,
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<Language>(() => {
        const saved = localStorage.getItem('mel-lang');
        return (saved === 'zh-TW' || saved === 'zh-CN' || saved === 'en') ? saved : 'en';
    });

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('mel-lang', newLang);
    };

    const t = translations[lang];

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = () => useContext(I18nContext);
