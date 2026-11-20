// src/pages/BookDetailPage.styles.ts
// 구글 북스 도서 상세 화면 스타일 (.ts)
import styled from "styled-components";

export const Container = styled.main`
    flex: 1;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 16px;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #f3f3f3;
    color: #333;
    cursor: pointer;
    transition: all 0.5s;
    margin-bottom: 20px;

    &:hover {
        background-color: #e0e0e0;
        border-color: #999;
    }
`;

export const DetailTitle = styled.h2`
    margin: 0 0 16px;
    font-size: 24px;
`;

export const CoverImage = styled.img`
    width: 200px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 20px;
`;

export const NoCoverBox = styled.div`
    width: 200px;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #f3f3f3;
    color: #777;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AuthorsText = styled.p`
    margin: 0 0 16px;
    font-weight: 600;
`;

export const DescriptionText = styled.p`
    margin: 0;
    line-height: 1.6;
`;
