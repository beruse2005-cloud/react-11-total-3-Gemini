// src/pages/MovieHomePage.styles.ts
// 영화 검색 홈 화면 스타일 (.ts)
import styled from "styled-components";

export const Container = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.h1`
    margin: 0;
    font-size: 28px;
    color: ${props => props.theme.color.text};
`;
