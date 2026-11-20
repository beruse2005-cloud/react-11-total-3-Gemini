// 상단 고정 헤더: 로고, 주요 메뉴 탭(NavLink), 로그인/회원가입 링크, 다크/라이트 전환 버튼
import styled from "styled-components";
import { NavLink, Link } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme/ThemeContext.tsx";
import {
    FaHome,
    FaCheckSquare,
    FaCoins,
    FaFilm,
    FaRocket,
    FaBook,
    FaMoon,
    FaSun,
    FaPaperPlane,
} from "react-icons/fa";

const Head = styled.header`
    position: sticky;
    top: 0;
    z-index: 20;
    height: 64px;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.color.surface};
    border-bottom: 1px solid ${props => props.theme.color.border};
`;

const BrandLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.theme.color.text};
`;

const NavList = styled.nav`
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
`;

// NavLink는 현재 URL과 일치할 때 자동으로 active 클래스를 부여해 현재 탭을 강조 표시
const NavItem = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    color: ${props => props.theme.color.subText};
    transition:
        background-color 0.15s ease,
        color 0.15s ease;

    &:hover {
        background-color: ${props => props.theme.color.muted};
        color: ${props => props.theme.color.text};
    }

    &.active {
        background-color: rgba(29, 111, 235, 0.12);
        color: ${props => props.theme.color.primary};
        font-weight: 600;
    }
`;

const RightGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const ActionLink = styled(Link)`
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    color: ${props => props.theme.color.subText};

    &:hover {
        color: ${props => props.theme.color.primary};
    }
`;

const ThemeButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 999px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.muted};
    color: ${props => props.theme.color.text};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
`;

function Header() {
    // ThemeContext에서 현재 테마와 toggleTheme 함수를 꺼냄
    const themeContext = useContext(ThemeContext);
    if (!themeContext) throw new Error("Provider 안에서 사용해주세요!");

    const isDark = themeContext.theme === "dark";

    return (
        <Head>
            <BrandLink to="/">
                <FaPaperPlane color="#1d6feb" size={16} />
                <span>My Universe</span>
            </BrandLink>

            <NavList>
                {/* end를 붙여 "/"일 때만 Home이 active 되고 "/todo" 등에서는 꺼지도록 함 */}
                <NavItem to="/" end>
                    <FaHome size={13} />
                    <span>Home</span>
                </NavItem>
                <NavItem to="/todo">
                    <FaCheckSquare size={13} />
                    <span>Todo</span>
                </NavItem>
                <NavItem to="/coin">
                    <FaCoins size={13} />
                    <span>Coin</span>
                </NavItem>
                <NavItem to="/movie">
                    <FaFilm size={13} />
                    <span>Movie</span>
                </NavItem>
                <NavItem to="/rocket">
                    <FaRocket size={13} />
                    <span>Rocket</span>
                </NavItem>
                <NavItem to="/book">
                    <FaBook size={13} />
                    <span>Book</span>
                </NavItem>
            </NavList>

            <RightGroup>
                <ActionLink to="/auth/login">로그인</ActionLink>
                <ActionLink to="/auth/signup">회원가입</ActionLink>
                <ThemeButton type="button" onClick={themeContext.toggleTheme}>
                    {isDark ? (
                        <FaSun size={13} color="#eab308" />
                    ) : (
                        <FaMoon size={13} color="#eab308" />
                    )}
                    <span>{isDark ? "라이트" : "다크"}</span>
                </ThemeButton>
            </RightGroup>
        </Head>
    );
}

export default Header;
