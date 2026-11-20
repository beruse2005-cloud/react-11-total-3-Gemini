// 동적 경로(/board/:id)에서 id를 읽어 해당 게시글 상세 내용을 조회하는 페이지
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Post } from "../styles/Post.ts";
import {
    StatusBox,
    Container,
    BackLink,
    ArticleCard,
    PostTitle,
    MetaInfo,
    PostBody,
} from "./styles/BoardDetailPage.ts";

function BoardDetailPage() {
    // useParams를 통해 동적 경로의 id 값을 꺼냄 (string | undefined)
    const { id } = useParams();
    // 데이터가 오기 전 상태를 표현하기 위해 초기값을 null로 둠
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        setLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("게시글을 불러오지 못했습니다.");
                }
                return res.json();
            })
            .then((json: Post) => setPost(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("알 수 없는 에러 : " + err);
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <StatusBox>게시글을 불러오는 중입니다...</StatusBox>;
    }

    if (!post) {
        return <StatusBox>게시글을 찾을 수 없습니다.</StatusBox>;
    }

    return (
        <Container>
            <BackLink to="/board">&larr; 게시판 목록으로</BackLink>
            <ArticleCard>
                <PostTitle>{post.title}</PostTitle>
                <MetaInfo>
                    <span>글 번호: {post.id}</span>
                    <span>작성자 ID: {post.userId}</span>
                </MetaInfo>
                <PostBody>{post.body}</PostBody>
            </ArticleCard>
        </Container>
    );
}

export default BoardDetailPage;
