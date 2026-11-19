import styled from "styled-components";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Outlet } from "react-router";

// 화면 최소 높이를 100dvh로 잡고 세로 flex로 배치해 Footer가 항상 아래쪽에 위치하게 함
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
            {/* Outlet: 현재 URL에 매칭된 자식 페이지 컴포넌트(Home, TodoPage, CoinPage 등)가 들어갈 자리 */}
            <Outlet />
            <Footer />
        </Wrap>
    );
}

export default MainLayout;
