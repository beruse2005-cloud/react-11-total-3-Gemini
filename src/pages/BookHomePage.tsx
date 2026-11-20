// src/pages/MovieHomePage.tsx
// 영화 검색 시작 페이지
import MovieSearchBar from "../components/MovieSearchBar.tsx";
import { Container, Title } from "./styles/MovieHomePage.ts";

function MovieHomePage() {
    return (
        <Container>
            <Title>Movie Search</Title>
            <MovieSearchBar keyword={""} />
        </Container>
    );
}

export default MovieHomePage;
