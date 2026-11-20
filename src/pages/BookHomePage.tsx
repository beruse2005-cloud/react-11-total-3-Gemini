// src/pages/MovieHomePage.tsx
// 영화 검색 시작 페이지
import MovieSearchBar from "../components/SearchBar.tsx";
import { Container, Title } from "./styles/BookHomePage.ts";

function MovieHomePage() {
    return (
        <Container>
            <Title>Book Search</Title>
            <MovieSearchBar keyword={""} />
        </Container>
    );
}

export default MovieHomePage;
