// 라이트 모드 색상 팔레트
export const LightTheme = {
    color: {
        background: "#f3f5f8", // 페이지 전체 바탕색
        surface: "#ffffff", // 카드, 헤더, 패널 등 표면 색
        muted: "#eef1f6", // 보조 배경 및 테이블 헤더 색
        text: "#111827", // 기본 글자색
        subText: "#6b7280", // 부가 설명 및 메타 글자색
        border: "#e5e7eb", // 테두리선 색
        primary: "#1d6feb", // 강조 포인트 색
    },
};

// 다크 모드 색상 팔레트 (LightTheme와 동일한 키 이름을 유지해야 테마 전환 시 코드 수정이 필요 없음)
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
