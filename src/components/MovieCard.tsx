// src/components/MovieCard.tsx
// 영화 검색 결과 카드: imdbID를 경로에 담아 /movie/detail/:id 상세 페이지로 연결
import type { MovieItem } from "../pages/MovieSearchPage.tsx";
import { StyledLink } from "../pages/styles/MovieCard.ts";

type MovieProps = {
    movie: MovieItem;
};

function MovieCard({ movie }: MovieProps) {
    return (
        <StyledLink to={`/movie/detail/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <span>{movie.Year}</span>
        </StyledLink>
    );
}

export default MovieCard;
