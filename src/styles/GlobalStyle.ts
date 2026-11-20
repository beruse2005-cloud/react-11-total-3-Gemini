// createGlobalStyle: 앱 전역에 공통 CSS 초기화와 현재 테마의 body 색상을 적용
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    // 패딩과 테두리를 요소 크기에 포함해 가로/세로 계산을 직관적으로 유지
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        min-height: 100%;
    }

    // ThemeProvider에서 내려주는 props.theme 색상을 body에 반영
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
        background-color: ${props => props.theme.color.background};
        color: ${props => props.theme.color.text};
        transition: background-color 0.15s ease, color 0.15s ease;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button, input {
        font-family: inherit;
    }
`;

export default GlobalStyle;
