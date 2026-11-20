// src/pages/MovieDetailPage.tsx
// 동적 경로(/movie/detail/:id)에서 imdbID를 받아 해당 영화의 상세 줄거리와 메타 정보를 표시
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container, BackBtn, PosterImage, MovieTitle, Plot } from "./styles/MovieDetailPage.ts";

type Movie = {
    Poster: string;
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    Plot: string;
};

function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${encodeURIComponent(id)}&plot=full`)
            .then(res => res.json())
            .then((json: Movie) => setMovie(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            });
    }, [id]);

    if (!movie) {
        return (
            <Container>
                <p>Loading...</p>
            </Container>
        );
    }

    return (
        <Container>
            <BackBtn type="button" onClick={() => navigate(-1)}>
                &larr; Back
            </BackBtn>

            <PosterImage src={movie.Poster} alt={movie.Title} />

            <MovieTitle>{movie.Title}</MovieTitle>
            <p>
                <strong>Year:</strong> {movie.Year}
            </p>
            <p>
                <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
                <strong>Director:</strong> {movie.Director}
            </p>
            <Plot>{movie.Plot}</Plot>
        </Container>
    );
}

export default MovieDetailPage;
