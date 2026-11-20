// createContext: 컴포넌트 트리 전반에 테마 값과 토글 함수를 전달하는 통로를 생성
import { createContext } from "react";

// 허용되는 테마 모드 리터럴 타입
export type ThemeMode = "light" | "dark";

// Context에 담길 데이터 형태: 현재 테마와 테마 전환 함수
export type ThemeContextType = {
    theme: ThemeMode;
    toggleTheme: VoidFunction;
};

// Provider 바깥에서 useContext를 잘못 호출했을 때 즉시 알아챌 수 있도록 초기값을 null로 둠
export const ThemeContext = createContext<ThemeContextType | null>(null);
