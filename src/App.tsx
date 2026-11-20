// 2단계. 테마 상태 관리 + ThemeContext.Provider + styled-components ThemeProvider + GlobalStyle + RouterProvider 결합
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle.ts";
import AppRouter from "./router/AppRouter.tsx";
import { DarkTheme, LightTheme } from "./styles/theme.ts";
import { ThemeContext, type ThemeMode } from "./contexts/theme/ThemeContext.tsx";

function App() {
    // localStorage에 저장된 테마 값을 초기 상태로 불러옴
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" ? "dark" : "light";
    });

    // 테마가 변경될 때마다 localStorage에 저장해 새로고침 후에도 유지
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
                <GlobalStyle />
                <RouterProvider router={AppRouter()} />
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;
