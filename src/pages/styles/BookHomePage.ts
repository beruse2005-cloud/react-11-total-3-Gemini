// src/pages/BookHomePage.styles.ts
// 구글 북스 검색 첫 화면 스타일 (.ts)
import styled from "styled-components";

export const Container = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 16px;
`;

export const Title = styled.span`
    display: block;
    font-size: 30px;
    font-weight: 800;
    color: ${props => props.theme.color.text};
`;
