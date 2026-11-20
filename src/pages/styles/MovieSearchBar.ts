// src/components/MovieSearchBar.styles.ts
// 영화 검색바 styled-components 스타일 (.ts)
import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    gap: 10px;
`;

export const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: ${props => props.theme.color.surface};
    color: ${props => props.theme.color.text};
`;

export const Button = styled.button`
    padding: 12px;
    background-color: #ff5959;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        opacity: 0.92;
    }
`;
