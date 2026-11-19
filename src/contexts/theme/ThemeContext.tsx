// createContext: 컴포넌트 트리 전체에 값을 내려보낼 "전달 통로(Context)"를 만드는 함수
import { createContext } from "react";

// 테마는 "light" 또는 "dark" 두 가지 값만 허용하도록 타입을 제한
export type ThemeMode = "light" | "dark";

// Context 안에 담길 데이터 모양 정의: 현재 테마 값 + 테마를 바꾸는 함수
export type ThemeContextType = {
    theme: ThemeMode;
    toggleTheme: VoidFunction;
};

// 초기값은 null로 둠
// -> Provider 바깥에서 실수로 useContext(ThemeContext)를 호출했을 때 null을 감지해 에러를 띄우기 위함
export const ThemeContext = createContext<ThemeContextType | null>(null);
