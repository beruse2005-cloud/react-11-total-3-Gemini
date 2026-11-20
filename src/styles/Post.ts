// 게시판 API(/posts)에서 받아오는 게시글 객체 타입
export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
