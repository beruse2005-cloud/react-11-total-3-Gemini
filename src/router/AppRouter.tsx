// URL 경로별로 어떤 레이아웃과 어떤 페이지를 보여줄지 정의하는 라우터 설정 파일
import { createBrowserRouter, type RouteObject } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import TodoPage from "../pages/TodoPage.tsx";
import CoinPage from "../pages/CoinPage.tsx";
import LogIn from "../pages/auth/LogIn.tsx";
import SignUp from "../pages/auth/SignUp.tsx";
import { Main } from "../styles/styles.tsx";

// 아직 별도 기능 페이지로 분리하지 않은 메뉴(Movie, Rocket, Book)용 임시 안내 컴포넌트
const PlaceholderPage = ({ title, description }: { title: string; description: string }) => (
    <Main>
        <h1>{title}</h1>
        <p>{description}</p>
    </Main>
);

const AppRouter = () => {
    const routes: RouteObject[] = [
        // 인증 관련 경로(/auth/login, /auth/signup)는 Header/Footer가 없는 AuthLayout 사용
        {
            element: <AuthLayout />,
            path: "/auth",
            children: [
                { path: "login", element: <LogIn /> },
                { path: "signup", element: <SignUp /> },
            ],
        },
        // 메인 포털 경로들은 Header와 Footer가 포함된 MainLayout 아래에 렌더링
        {
            element: <MainLayout />,
            path: "/",
            children: [
                { index: true, element: <Home /> }, // "/" -> Home
                { path: "todo", element: <TodoPage /> }, // "/todo" -> TodoPage
                { path: "coin", element: <CoinPage /> }, // "/coin" -> CoinPage
                {
                    path: "movie",
                    element: (
                        <PlaceholderPage
                            title="무비검색앱"
                            description="영화 데이터베이스 API를 활용한 영화 검색 페이지입니다."
                        />
                    ),
                },
                {
                    path: "rocket",
                    element: (
                        <PlaceholderPage
                            title="로켓앱"
                            description="스페이스X의 로켓 발사 상태 및 상세 정보 조회 페이지입니다."
                        />
                    ),
                },
                {
                    path: "book",
                    element: (
                        <PlaceholderPage
                            title="구글북스 검색앱"
                            description="구글 도서 데이터를 활용한 온라인 책 검색 페이지입니다."
                        />
                    ),
                },
                { path: "about", element: <About /> },
            ],
        },
    ];

    return createBrowserRouter(routes);
};

export default AppRouter;
