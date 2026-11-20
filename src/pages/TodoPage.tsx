// 할 일 등록, 완료 체크 토글, 항목 삭제 기능을 제공하는 투두 페이지
import { type ChangeEvent, type FormEvent, useState } from "react";
import styled from "styled-components";
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa";

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
        { id: 1, text: "156", completed: false },
        { id: 2, text: "645267", completed: false },
    ]);
    const [inputValue, setInputValue] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // 공백을 제거한 뒤 빈 문자열이 아닐 때만 새 할 일 추가
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setTodos(prev => [
            ...prev,
            {
                id: Date.now(),
                text: trimmed,
                completed: false,
            },
        ]);
        setInputValue("");
    };

    // 대상 id의 완료 여부만 반전
    const handleToggle = (id: number) => {
        setTodos(prev =>
            prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item)),
        );
    };

    // 대상 id를 제외한 새 배열로 갱신
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
