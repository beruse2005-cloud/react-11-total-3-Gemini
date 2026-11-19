// 브라우저의 HTML 문서(#root)와 React 앱을 연결하는 시작점
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// StrictMode는 개발 모드에서 잠재적 문제를 미리 잡기 위해 일부 훅/렌더링을 두 번 검사함
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
