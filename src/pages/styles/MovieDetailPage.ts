// src/pages/MovieDetailPage.styles.ts
// 영화 상세 화면 스타일 (.ts)
import styled from "styled-components";

export const Container = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px;
`;

export const BackBtn = styled.button`
    display: block;
    margin-bottom: 20px;
    background: none;
    border: none;
    color: #ff5959;
    font-size: 16px;
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

export const PosterImage = styled.img`
    max-width: 320px;
    width: 100%;
    border-radius: 12px;
    margin-bottom: 16px;
`;

export const MovieTitle = styled.h1`
    margin: 0 0 12px;
    font-size: 28px;
`;

export const Plot = styled.p`
    line-height: 1.6;
    margin-top: 20px;
`;
