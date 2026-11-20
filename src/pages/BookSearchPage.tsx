// useSearchParams 쿼리 스트링(?keyword=...)을 읽어 Google Books API 검색 결과를 출력
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import {
    Container,
    Heading,
    Message,
    BookCard,
    CoverImage,
    NoCoverBox,
    BookTitle,
    BookAuthors,
} from "./styles/BookSearchPage.ts";

// ? 표기는 해당 프로퍼티가 없을 수 있음(undefined 가능)을 뜻함
export type Book = {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        description?: string | undefined;
        imageLinks?: {
            thumbnail: string;
        };
    };
};

type ApiResponse = {
    items: Book[];
};

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function BookSearchPage() {
    // useParams는 경로의 동적 파라미터(:id -> string | undefined),
    // useSearchParams는 URL의 쿼리 스트링(?keyword=... -> string | null)을 다룸
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;

        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.items))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <Container>
            <Heading>검색 결과 : {keyword}</Heading>

            {/* keyword는 string | null 이지만 SearchBar는 string을 기대하므로,
                null인 상황(검색어 없음)을 빈 문자열("")로 처리해 타입 불일치를 해결함 */}
            <SearchBar keyword={keyword || ""} />

            {loading ? (
                <Message>로딩 중입니다...</Message>
            ) : list.length === 0 ? (
                <Message>검색 결과가 없습니다.</Message>
            ) : (
                list.map((item, index) => (
                    <BookCard key={`${item.id}-${index}`} to={`/book/detail/${item.id}`}>
                        {item.volumeInfo.imageLinks?.thumbnail ? (
                            <CoverImage
                                src={item.volumeInfo.imageLinks.thumbnail}
                                alt={item.volumeInfo.title}
                            />
                        ) : (
                            <NoCoverBox>No Cover</NoCoverBox>
                        )}

                        <div>
                            <BookTitle>{item.volumeInfo.title}</BookTitle>
                            <BookAuthors>{item.volumeInfo.authors?.join(", ")}</BookAuthors>
                        </div>
                    </BookCard>
                ))
            )}
        </Container>
    );
}

export default BookSearchPage;
