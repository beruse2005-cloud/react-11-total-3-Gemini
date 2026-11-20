// 로켓 발사 상세 페이지의 styled-components 스타일 정의
import styled from "styled-components";
import { Link } from "react-router";

export const StatusMessage = styled.div`
    padding: 80px 0;
    text-align: center;
    color: #888;
`;

export const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 32px 16px;
`;

// Link는 a 태그로 렌더링되므로 margin-bottom 적용을 위해 inline-block 지정
export const BackBtn = styled(Link)`
    display: inline-block;
    margin-bottom: 24px;
    color: #2563eb;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const Content = styled.div`
    display: flex;
    gap: 32px;

    @media (max-width: 720px) {
        flex-direction: column;
    }
`;

export const DetailImage = styled.img`
    width: 320px;
    height: 320px;
    object-fit: cover;
    border-radius: 12px;
    background-color: #f3f3f3;

    @media (max-width: 720px) {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
    }
`;

export const Info = styled.div`
    flex: 1;
`;

export const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 12px;
`;

export const Description = styled.p`
    line-height: 1.6;
    color: #444;
    margin-bottom: 20px;
`;

export const MetaList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Badge = styled.span`
    padding: 2px 10px;
    border-radius: 999px;
    background: #eef2ff;
    color: #3730a3;
    font-size: 13px;
`;

export const StatusText = styled.li`
    font-size: 20px;
    font-weight: bold;
    color: #2563eb;
`;
