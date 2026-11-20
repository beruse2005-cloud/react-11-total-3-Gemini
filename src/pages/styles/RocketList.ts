// 로켓 발사 목록 페이지의 styled-components 스타일 정의
import styled from "styled-components";
import { Link } from "react-router";

export const LoadingBox = styled.div`
    padding: 80px 0;
    text-align: center;
    color: #888;
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 32px 16px;
`;

export const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 24px;
`;

export const ListWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

// 한 줄에 4개 카드 배치
export const RocketCard = styled(Link)`
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    overflow: hidden;
    background-color: white;
    color: #111827;
    text-decoration: none;
    width: calc(25% - 15px);
    transition:
        transform 0.15s ease,
        box-shadow 0.15s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 900px) {
        width: calc(50% - 10px);
    }

    @media (max-width: 540px) {
        width: 100%;
    }
`;

export const Thumbnail = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    background-color: #f3f3f3;
`;

export const Info = styled.div`
    padding: 12px 16px 16px;
`;

export const Name = styled.h3`
    font-size: 16px;
    margin-bottom: 6px;
`;

export const Status = styled.p`
    font-weight: bold;
    color: #2563eb;
    font-size: 14px;
    margin: 0;
`;
