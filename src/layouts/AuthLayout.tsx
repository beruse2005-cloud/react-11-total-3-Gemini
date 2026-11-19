import styled from "styled-components";
import { Outlet } from "react-router";

// 로그인/회원가입 폼을 화면 정중앙에 배치하기 위한 레이아웃
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
