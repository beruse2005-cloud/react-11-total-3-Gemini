// src/pages/MovieSearchPage.styles.ts
// 영화 검색 결과 페이지 스타일 (.ts)
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

export const KeywordHeading = styled.h2`
    margin: 0;
    font-size: 22px;
    color: ${props => props.theme.color.text};
`;

export const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 60px;
    justify-content: center;
`;
