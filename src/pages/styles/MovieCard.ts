// src/components/MovieCard.styles.ts
// 영화 검색 결과 카드 styled-components 스타일 (.ts)
import styled from "styled-components";
import { Link } from "react-router";

export const StyledLink = styled(Link)`
    width: 200px;
    border-radius: 12px;
    padding: 10px;
    background-color: white;
    color: #333;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.5s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    text-decoration: none;

    img {
        width: 100%;
        border-radius: 8px;
    }

    h3 {
        margin: 0;
        font-size: 16px;
    }

    &:hover {
        transform: scale(1.1);
    }
`;
