// src/pages/BookDetailPage.tsx
// 선택한 도서 id의 상세 정보를 조회하고 navigate(-1)로 뒤로 이동하는 페이지
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { API_KEY, type Book } from "./BookSearchPage.tsx";
import {
    Container,
    BackButton,
    DetailTitle,
    CoverImage,
    NoCoverBox,
    AuthorsText,
    DescriptionText,
} from "./styles/BookDetailPage.ts";

function BookDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (!id) return;

        const keyQuery = API_KEY ? `?key=${API_KEY}` : "";
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}${keyQuery}`)
            .then(res => res.json())
            .then((json: Book) => setBook(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            });
    }, [id]);

    if (!book) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <BackButton
                type="button"
                onClick={() => {
                    // 이전 방문 화면으로 이동
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </BackButton>
            <DetailTitle>{book.volumeInfo.title}</DetailTitle>
            {book.volumeInfo.imageLinks?.thumbnail ? (
                <CoverImage
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                />
            ) : (
                <NoCoverBox>No Cover</NoCoverBox>
            )}
            <AuthorsText>{book.volumeInfo.authors?.join(", ")}</AuthorsText>
            {/* React는 기본적으로 문자열 태그를 이스케이프해 문자로 출력하므로,
                API 응답에 포함된 HTML 태그를 실제 HTML로 그리려면 dangerouslySetInnerHTML={{ __html: ... }} 사용.
                외부 데이터 HTML은 보안(XSS) 위험이 있을 수 있으므로 __html에는 string | TrustedHTML 형태를 넣어줌 */}
            <DescriptionText
                dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "" }}
            />
        </Container>
    );
}

export default BookDetailPage;
