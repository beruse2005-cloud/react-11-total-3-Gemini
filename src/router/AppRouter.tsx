// URL 경로별로 어떤 레이아웃과 페이지를 렌더링할지 정의하는 라우터 설정 파일
// 고정 경로(/about 등)가 아닌 동적 세그먼트(:id)를 통해 상세 페이지로 연결하고,
// 메인 포털 화면들은 MainLayout(Header + Outlet + Footer) 아래에 배치함
import { createBrowserRouter, type RouteObject } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/TodoPage.tsx";
import CoinPage from "../pages/CoinPage.tsx";
import RocketList from "../pages/RocketList.tsx";
import RocketDetail from "../pages/RocketDetail.tsx";
import BoardPage from "../pages/BoardPage.tsx";
import BoardDetailPage from "../pages/BoardDetailPage.tsx";
import BookHomePage from "../pages/BookHomePage.tsx";
import BookSearchPage from "../pages/BookSearchPage.tsx";
import BookDetailPage from "../pages/BookDetailPage.tsx";
import MovieHomePage from "../pages/MovieHomePage.tsx";
import MovieSearchPage from "../pages/MovieSearchPage.tsx";
import MovieDetailPage from "../pages/MovieDetailPage.tsx";
import LogIn from "../pages/auth/LogIn.tsx";
import SignUp from "../pages/auth/SignUp.tsx";

const AppRouter = () => {
    const routes: RouteObject[] = [
        // 인증 경로(/auth/login, /auth/signup)는 Header/Footer가 없는 AuthLayout 사용
        {
            element: <AuthLayout />,
            path: "/auth",
            children: [
                { path: "login", element: <LogIn /> },
                { path: "signup", element: <SignUp /> },
            ],
        },
        // 메인 포털 경로들은 MainLayout 아래에 렌더링
        {
            element: <MainLayout />,
            path: "/",
            children: [
                { index: true, element: <Home /> },
                { path: "todo", element: <TodoPage /> },
                { path: "coin", element: <CoinPage /> },
                { path: "board", element: <BoardPage /> },
                { path: "board/:id", element: <BoardDetailPage /> },
                { path: "movie", element: <MovieHomePage /> },
                { path: "movie/search", element: <MovieSearchPage /> },
                { path: "movie/detail/:id", element: <MovieDetailPage /> },
                { path: "rocket", element: <RocketList /> },
                { path: "rocket/:id", element: <RocketDetail /> },
                { path: "book", element: <BookHomePage /> },
                { path: "book/search", element: <BookSearchPage /> },
                { path: "book/detail/:id", element: <BookDetailPage /> },
            ],
        },
    ];

    return createBrowserRouter(routes);
};

export default AppRouter;
