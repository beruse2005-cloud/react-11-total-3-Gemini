// 구글 북스 검색 결과 목록 스타일 (.ts)
import styled from "styled-components";
import { Link } from "react-router";

export const Container = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px 16px;
`;

export const Heading = styled.h3`
    margin: 0 0 8px;
    font-size: 20px;
    color: ${props => props.theme.color.text};
`;

export const Message = styled.div`
    padding: 20px 0;
    color: ${props => props.theme.color.subText};
    text-align: center;
`;

export const BookCard = styled(Link)`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 8px;
    background-color: ${props => props.theme.color.surface};
    margin-top: 12px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.theme.color.border};
    transition: all 0.5s;
    color: ${props => props.theme.color.text};
    text-decoration: none;

    &:hover {
        background-color: ${props => props.theme.color.muted};
    }
`;

export const CoverImage = styled.img`
    width: 60px;
    height: 90px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
`;

export const NoCoverBox = styled.div`
    width: 60px;
    height: 90px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    color: #777;
    background-color: #eee;
    flex-shrink: 0;
`;

export const BookTitle = styled.div`
    font-weight: 600;
    margin-bottom: 4px;
`;

export const BookAuthors = styled.div`
    font-size: 12px;
    color: ${props => props.theme.color.subText};
`;
