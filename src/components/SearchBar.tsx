// 검색어를 입력받아 /book/search?keyword=... 쿼리 스트링 경로로 이동시키는 컴포넌트
import { type ChangeEvent, type SubmitEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Form, SearchInput, SubmitButton } from "./SearchBar.ts";

// keyword prop은 string 타입을 받도록 정의
type Props = {
    keyword: string;
};

function SearchBar({ keyword }: Props) {
    const navigate = useNavigate();
    const [input, setInput] = useState(keyword || "");

    // 검색 결과 화면에서 다른 키워드로 이동할 때 입력창 값도 맞춰줌
    useEffect(() => {
        setInput(keyword || "");
    }, [keyword]);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const onSubmitHandler = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const k = input.trim();
        if (!k) return;

        navigate(`/book/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <SearchInput
                type="text"
                placeholder="검색할 책 제목이나 키워드를 입력하세요"
                onChange={onChangeHandler}
                value={input}
            />
            <SubmitButton type="submit">검색</SubmitButton>
        </Form>
    );
}

export default SearchBar;
