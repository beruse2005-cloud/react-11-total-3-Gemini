// 구글 북스 검색바 styled-components 스타일 (.ts)
import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    gap: 10px;
    width: 100%;
    margin-top: 16px;
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    color: ${props => props.theme.color.text};
`;

export const SubmitButton = styled.button`
    padding: 12px 18px;
    border: none;
    background-color: ${props => props.theme.color.primary};
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        opacity: 0.92;
    }
`;
