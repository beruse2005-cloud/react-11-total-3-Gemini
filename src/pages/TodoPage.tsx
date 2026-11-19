import { type ChangeEvent, type SubmitEvent, useState } from "react";
import styled from "styled-components";
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa";

// 할 일 항목 하나의 타입
type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
};

const PageWrap = styled.main`
    flex: 1;
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    padding: 40px 20px 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    margin: 0 0 24px;
    font-size: 28px;
    font-weight: 700;
    color: ${props => props.theme.color.primary};
    align-self: flex-start;
`;

// 입력창 + 추가(+) 버튼을 감싸는 카드형 폼
const FormCard = styled.form`
    width: 100%;
    padding: 18px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
`;

const TodoInput = styled.input`
    flex: 1;
    height: 40px;
    padding: 0 14px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.background};
    color: ${props => props.theme.color.text};
    font-size: 14px;
    outline: none;

    &:focus {
        border-color: ${props => props.theme.color.primary};
    }
`;

const AddButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background-color: ${props => props.theme.color.primary};
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        opacity: 0.92;
    }
`;

const TodoList = styled.ul`
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TodoRow = styled.li`
    padding: 14px 18px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

const LeftGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
`;

const CheckButton = styled.button<{ $completed: boolean }>`
    border: none;
    background: transparent;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${props => (props.$completed ? "#16a34a" : "#9ca3af")};
    cursor: pointer;
`;

// 완료된 항목은 취소선과 흐린 글자색을 적용
const TodoText = styled.span<{ $completed: boolean }>`
    font-size: 14px;
    word-break: break-word;
    text-decoration: ${props => (props.$completed ? "line-through" : "none")};
    color: ${props => (props.$completed ? props.theme.color.subText : "inherit")};
`;

const DeleteButton = styled.button`
    border: none;
    background: transparent;
    padding: 4px;
    color: #e06c75;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        color: #dc2626;
    }
`;

function TodoPage() {
    const [todos, setTodos] = useState<TodoItem[]>([
        // To do List 열었을 때 이것이 떠 있음 지우고 싶으면 지워도 됨
        { id: 1, text: "156", completed: false },
        { id: 2, text: "645267", completed: false },
    ]);
    const [inputValue, setInputValue] = useState<string>("");

    // 입력창 타이핑 시 inputValue 상태 업데이트
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // 폼 제출(Enter 또는 + 버튼 클릭) 시 새 할 일 추가
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // 페이지 새로고침 방지
        const trimmed = inputValue.trim();
        if (!trimmed) return; // 공백만 입력된 경우 추가하지 않음

        setTodos(prev => [
            ...prev,
            {
                id: Date.now(),
                text: trimmed,
                completed: false,
            },
        ]);
        setInputValue(""); // 입력창 초기화
    };

    // 선택한 id의 할 일만 completed 상태를 반전(true <-> false)
    const handleToggle = (id: number) => {
        setTodos(prev =>
            prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item)),
        );
    };

    // 선택한 id의 할 일만 배열에서 제외
    const handleDelete = (id: number) => {
        setTodos(prev => prev.filter(item => item.id !== id));
    };

    return (
        <PageWrap>
            <Title>Todo List</Title>

            <FormCard onSubmit={handleSubmit}>
                <TodoInput
                    type="text"
                    placeholder="오늘의 할 일을 입력하세요"
                    value={inputValue}
                    onChange={handleChange}
                />
                <AddButton type="submit" aria-label="할 일 추가">
                    <FaPlus size={14} />
                </AddButton>
            </FormCard>

            <TodoList>
                {todos.map(todo => (
                    <TodoRow key={todo.id}>
                        <LeftGroup>
                            <CheckButton
                                type="button"
                                $completed={todo.completed}
                                onClick={() => handleToggle(todo.id)}
                                aria-label="완료 토글">
                                <FaCheck size={14} />
                            </CheckButton>
                            <TodoText $completed={todo.completed}>{todo.text}</TodoText>
                        </LeftGroup>
                        <DeleteButton
                            type="button"
                            onClick={() => handleDelete(todo.id)}
                            aria-label="할 일 삭제">
                            <FaTrash size={14} />
                        </DeleteButton>
                    </TodoRow>
                ))}
            </TodoList>
        </PageWrap>
    );
}

export default TodoPage;
