// createGlobalStyle: 앱 전체에 전역 CSS 규칙을 주입하는 styled-components 기능
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    // padding과 border가 width/height 계산에 포함되도록 설정해 레이아웃 계산을 직관적으로 만듦
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        min-height: 100%;
    }

    // 현재 활성화된 theme(LightTheme 또는 DarkTheme)의 색상을 body에 자동 적용
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
        background-color: ${props => props.theme.color.background};
        color: ${props => props.theme.color.text};
        transition: background-color 0.15s ease, color 0.15s ease;
    }

    // 링크 기본 밑줄과 파란색을 없애고 부모 글자색을 따르게 함
    a {
        color: inherit;
        text-decoration: none;
    }

    button, input {
        font-family: inherit;
    }
`;

export default GlobalStyle;
