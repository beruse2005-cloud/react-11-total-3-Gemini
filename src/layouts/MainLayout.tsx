// 포털 기본 뼈대: Header 위에 고정, Outlet에 자식 페이지 렌더링, Footer 아래 배치
import styled from "styled-components";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Outlet } from "react-router";

const Wrap = styled.div`
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.color.background};
    color: ${props => props.theme.color.text};
`;

function MainLayout() {
    return (
        <Wrap>
            <Header />
            <Outlet />
            <Footer />
        </Wrap>
    );
}

export default MainLayout;
