// src/pages/MovieSearchPage.tsx
// 쿼리 파라미터 keyword로 OMDb API를 호출해 영화 목록과 로딩/에러/빈 결과 상태를 표시
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import MovieSearchBar from "../components/MovieSearchBar.tsx";
import MovieCard from "../components/MovieCard.tsx";
import { Container, KeywordHeading, List } from "./styles/MovieSearchPage.ts";

export type MovieItem = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};

type ApiResponse = {
    Search?: MovieItem[];
};

function MovieSearchPage() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<MovieItem[]>([]);
    const [loading, setLoading] = useState(false);
    // 화면에 표시할 에러 메시지를 관리하는 state
    const [error, setError] = useState("");

    useEffect(() => {
        // keyword가 null이면 검색 요청을 보내지 않음
        if (!keyword) {
            setList([]);
            setError("");
            setLoading(false);
            return;
        }

        setList([]);
        setError("");
        setLoading(true);

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${encodeURIComponent(keyword)}`)
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.Search ?? []))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                    setError("검색하는데 오류가 발생하였습니다.");
                } else {
                    // 개발자 도구에서 원인 파악을 위해 원본 에러를 로그로 남기고 사용자 안내 메시지 설정
                    console.log(err);
                    setError("검색하는데 오류가 발생하였습니다.");
                }
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <Container>
            <KeywordHeading>검색 키워드 : {keyword}</KeywordHeading>

            <MovieSearchBar keyword={keyword || ""} />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <List>
                {Array.isArray(list) && list.length > 0
                    ? list.map((x, index) => <MovieCard key={`${x.imdbID}-${index}`} movie={x} />)
                    : !loading && !error && "검색 결과가 없습니다."}
            </List>
        </Container>
    );
}

export default MovieSearchPage;
