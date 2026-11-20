// JSONPlaceholder 게시글 목록을 테이블로 보여주고 클릭 시 /board/:id 상세로 이동
import { useEffect, useState } from "react";
import type { Post } from "../styles/Post.ts";
import {
    LoadingText,
    Container,
    Title,
    BoardTable,
    TableRow,
    IdCell,
    TitleCell,
    UserIdCell,
    StyledLink,
} from "./styles/BoardPage.ts";

function BoardPage() {
    const [list, setList] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then((json: Post[]) => {
                setList(json);
                setLoading(false);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("알 수 없는 에러 : " + err);
                }
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingText>데이터를 로드 중입니다...</LoadingText>;
    }

    return (
        <Container>
            <Title>커뮤니티 게시판</Title>
            <BoardTable>
                <thead>
                    <tr>
                        {/* td로 만든 스타일을 thead에서 as="th"로 재사용 */}
                        <IdCell as={"th"}>번호</IdCell>
                        <th>제목</th>
                        <th>작성자 ID</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(item => (
                        <TableRow key={item.id}>
                            <IdCell>{item.id}</IdCell>
                            <TitleCell>
                                <StyledLink to={`/board/${item.id}`}>{item.title}</StyledLink>
                            </TitleCell>
                            <UserIdCell>{item.userId}</UserIdCell>
                        </TableRow>
                    ))}
                </tbody>
            </BoardTable>
        </Container>
    );
}

export default BoardPage;
