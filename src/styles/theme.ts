// 라이트 모드에서 사용할 색상 팔레트
export const LightTheme = {
    color: {
        background: "#f3f5f8", // 전체 페이지 배경색
        surface: "#ffffff", // 카드, 헤더, 폼 등 떠 있는 표면 배경색
        muted: "#eef1f6", // 버튼이나 보조 영역 배경색
        text: "#111827", // 기본 본문 글자색
        subText: "#6b7280", // 설명문 등 보조 글자색
        border: "#e5e7eb", // 카드/헤더 테두리선 색
        primary: "#1d6feb", // 포인트 컬러 (파란색)
    },
};

// 다크 모드에서 사용할 색상 팔레트
// 라이트 모드와 동일한 키 이름을 써야 컴포넌트 코드를 바꾸지 않고 테마만 스위칭할 수 있음
export const DarkTheme = {
    color: {
        background: "#111827",
        surface: "#1f2937",
        muted: "#273244",
        text: "#f9fafb",
        subText: "#9ca3af",
        border: "#374151",
        primary: "#3b82f6",
    },
};
