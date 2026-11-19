// 앱 최상위 컴포넌트: 테마 상태를 관리하고 Context / ThemeProvider / RouterProvider를 연결
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle.ts";
import AppRouter from "./router/AppRouter.tsx";
import { DarkTheme, LightTheme } from "./styles/theme.ts";
import { ThemeContext, type ThemeMode } from "./contexts/theme/ThemeContext.tsx";

function App() {
    // 첫 렌더링 시 localStorage에 저장된 테마가 있으면 불러오고, 없으면 "light"로 시작
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" ? "dark" : "light";
    });

    // theme 값이 바뀔 때마다 localStorage에 저장해 새로고침해도 테마가 유지되도록 함
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    // 현재 테마가 "dark"면 "light"로, 아니면 "dark"로 전환
    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    return (
        // 1. ThemeContext.Provider: Header 등에서 useContext(ThemeContext)로 테마 상태와 토글 함수에 접근 가능하게 함
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {/* 2. styled-components ThemeProvider: styled 컴포넌트 내부에서 props.theme으로 현재 테마 색상을 쓰게 함 */}
            <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
                {/* 3. 전역 스타일 적용 */}
                <GlobalStyle />
                {/* 4. 현재 URL에 맞는 라우트(Layout + Page) 렌더링 */}
                <RouterProvider router={AppRouter()} />
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;
