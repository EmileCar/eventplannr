import React, { createContext, useState } from 'react';
import colors from '../styles/colors.style';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(colors.light);

    const toggleTheme = () => {
        setTheme(themeStyle === colors.light ? colors.dark : colors.light);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};