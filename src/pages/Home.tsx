import styled from "styled-components";
import { useNavigate } from "react-router";
import { FaCheckSquare, FaCoins, FaFilm, FaClipboardList, FaRocket, FaBook } from "react-icons/fa";
import type { ReactNode } from "react";

// 포트폴리오 카드 한 개의 데이터 구조
type ProjectItem = {
    id: string;
    title: string;
    description: string;
    path: string;
    icon: ReactNode;
};

const PageWrap = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 28px 32px 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

// 상단 "My Project Dashboard" 안내 카드
const BannerCard = styled.section`
    padding: 28px 32px;
    border-radius: 12px;
    background-color: ${props => props.theme.color.surface};
    border: 1px solid ${props => props.theme.color.border};
`;

const BannerTitle = styled.h1`
    margin: 0 0 8px;
    font-size: 28px;
    font-weight: 700;
    color: ${props => props.theme.color.primary};
`;

const BannerSub = styled.p`
    margin: 0;
    font-size: 14px;
    color: ${props => props.theme.color.subText};
`;

// 데스크톱 3열, 태블릿 2열, 모바일 1열로 반응형 배치되는 카드 그리드
const Grid = styled.section`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;

    @media (max-width: 960px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const ProjectCard = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 190px;
    padding: 28px 20px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    color: ${props => props.theme.color.text};
    cursor: pointer;
    transition:
        transform 0.15s ease,
        box-shadow 0.15s ease,
        border-color 0.15s ease;

    &:hover {
        transform: translateY(-2px);
        border-color: ${props => props.theme.color.primary};
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    }
`;

const IconBox = styled.div`
    margin-bottom: 14px;
    color: ${props => props.theme.color.primary};
`;

const CardTitle = styled.h2`
    margin: 0 0 8px;
    font-size: 17px;
    font-weight: 700;
`;

const CardDesc = styled.p`
    margin: 0;
    font-size: 13px;
    color: ${props => props.theme.color.subText};
`;

// 화면에 렌더링할 6개 프로젝트 카드 목록
const PROJECTS: ProjectItem[] = [
    {
        id: "todo",
        title: "투두리스트",
        description: "일 체계적인 일정 관리와 할 일 목록 기록",
        path: "/todo",
        icon: <FaCheckSquare size={26} />,
    },
    {
        id: "coin",
        title: "코인래커",
        description: "실시간 가상화폐 시세 확인 및 정보 트래킹",
        path: "/coin",
        icon: <FaCoins size={26} />,
    },
    {
        id: "movie",
        title: "무비검색앱",
        description: "영화 데이터베이스 API를 활용한 영화 검색",
        path: "/movie",
        icon: <FaFilm size={26} />,
    },
    {
        id: "board",
        title: "게시판",
        description: "기본적인 커뮤니티 게시판",
        path: "/about",
        icon: <FaClipboardList size={26} />,
    },
    {
        id: "rocket",
        title: "로켓앱",
        description: "스페이스X의 로켓 발사 상태 및 상세 정보 조회",
        path: "/rocket",
        icon: <FaRocket size={26} />,
    },
    {
        id: "book",
        title: "구글북스 검색앱",
        description: "구글 도서 데이터를 활용한 온라인 책 검색",
        path: "/book",
        icon: <FaBook size={26} />,
    },
];

function Home() {
    // 클릭 시 다른 경로로 이동하기 위한 React Router 훅
    const navigate = useNavigate();

    return (
        <PageWrap>
            <BannerCard>
                <BannerTitle>My Project Dashboard</BannerTitle>
                <BannerSub>지금까지 구축한 포트폴리오 리스트입니다.</BannerSub>
            </BannerCard>

            <Grid>
                {PROJECTS.map(project => (
                    <ProjectCard
                        key={project.id}
                        type="button"
                        onClick={() => navigate(project.path)}>
                        <IconBox>{project.icon}</IconBox>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDesc>{project.description}</CardDesc>
                    </ProjectCard>
                ))}
            </Grid>
        </PageWrap>
    );
}

export default Home;
