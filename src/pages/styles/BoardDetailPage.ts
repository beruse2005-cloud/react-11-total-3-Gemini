// 커뮤니티 게시글 상세 페이지 styled-components 스타일
import styled from "styled-components";
import { Link } from "react-router";

export const StatusBox = styled.div`
    padding: 80px 0;
    text-align: center;
    color: ${props => props.theme.color.subText};
`;

export const Container = styled.main`
    flex: 1;
    width: 100%;
    max-width: 820px;
    margin: 0 auto;
    padding: 32px 16px;
`;

export const BackLink = styled(Link)`
    display: inline-block;
    margin-bottom: 20px;
    font-size: 14px;
    color: ${props => props.theme.color.primary};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const ArticleCard = styled.article`
    border-radius: 12px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    padding: 28px;
`;

export const PostTitle = styled.h1`
    margin: 0 0 12px;
    font-size: 24px;
    font-weight: 700;
    color: ${props => props.theme.color.text};
`;

export const MetaInfo = styled.div`
    display: flex;
    gap: 16px;
    font-size: 13px;
    color: ${props => props.theme.color.subText};
    padding-bottom: 18px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.color.border};
`;

export const PostBody = styled.p`
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: ${props => props.theme.color.text};
    white-space: pre-line;
`;
