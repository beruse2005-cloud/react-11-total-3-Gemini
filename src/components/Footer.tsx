// 화면 하단 푸터
import styled from "styled-components";

const Foot = styled.footer`
    height: 70px;
    border-top: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    color: ${props => props.theme.color.subText};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
`;

function Footer() {
    return <Foot>Copyright 2026 Practice</Foot>;
}

export default Footer;
