// 로그인/회원가입 화면을 중앙에 배치하는 레이아웃
import styled from "styled-components";
import { Outlet } from "react-router";

const Wrap = styled.div`
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.color.background};
    color: ${props => props.theme.color.text};
`;

function AuthLayout() {
    return (
        <Wrap>
            <Outlet />
        </Wrap>
    );
}

export default AuthLayout;
