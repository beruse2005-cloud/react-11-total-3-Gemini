// 커뮤니티 게시판 목록 페이지 styled-components 스타일
import styled from "styled-components";
import { Link } from "react-router";

export const LoadingText = styled.div`
    padding: 80px 0;
    text-align: center;
    color: ${props => props.theme.color.subText};
`;

export const Container = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 32px 16px;
`;

export const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 24px;
    color: ${props => props.theme.color.text};
`;

export const BoardTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-top: 2px solid ${props => props.theme.color.text};
    background-color: ${props => props.theme.color.surface};

    th,
    td {
        padding: 16px 14px;
    }

    th {
        background-color: ${props => props.theme.color.muted};
        font-size: 14px;
        font-weight: 600;
        color: ${props => props.theme.color.text};
        border-bottom: 1px solid ${props => props.theme.color.border};
        text-align: center;
    }

    td {
        border-bottom: 1px solid ${props => props.theme.color.border};
    }
`;

export const TableRow = styled.tr`
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(29, 111, 235, 0.06);
    }
`;

export const IdCell = styled.td`
    width: 80px;
    text-align: center;
    color: ${props => props.theme.color.subText};
`;

export const TitleCell = styled.td`
    text-align: left;
`;

export const UserIdCell = styled.td`
    width: 110px;
    text-align: center;
    color: ${props => props.theme.color.subText};
`;

export const StyledLink = styled(Link)`
    color: ${props => props.theme.color.text};
    text-decoration: none;

    &:hover {
        color: ${props => props.theme.color.primary};
    }
`;
