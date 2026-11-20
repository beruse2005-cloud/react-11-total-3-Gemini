// src/components/MovieSearchBar.tsx
// 영화 검색어를 입력받아 /movie/search?keyword=...로 이동하는 검색바 컴포넌트
import { useNavigate } from "react-router";
import { type ChangeEvent, type SubmitEvent, useEffect, useState } from "react";
import { Button, Form, Input } from "../pages/styles/MovieSearchBar.ts"

// input state가 string이므로 초기값으로 들어오는 keyword 역시 string 타입으로 맞춤
type Props = {
    keyword: string;
};

function MovieSearchBar({ keyword }: Props) {
    const navigate = useNavigate();
    const [input, setInput] = useState(keyword);

    useEffect(() => {
        setInput(keyword);
    }, [keyword]);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const onSubmitHandler = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const k = input.trim();
        if (!k) return;
        navigate(`/movie/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Input
                type="text"
                placeholder="영화 제목을 입력하세요"
                onChange={onChangeHandler}
                value={input}
            />
            <Button type="submit">Search</Button>
        </Form>
    );
}

export default MovieSearchBar;
