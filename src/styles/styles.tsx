// 여러 페이지에서 공통으로 쓸 수 있는 기본 메인 컨테이너
import styled from "styled-components";

export const Main = styled.main`
    flex: 1; // MainLayout이 세로 flex이므로 Header와 Footer 사이 남은 공간을 꽉 채움
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 32px;
`;

// 카드형 섹션에서 공통으로 재사용할 수 있는 컨테이너
export const SectionCard = styled.section`
    border-radius: 12px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    padding: 24px;
`;

// 페이지 상단 제목용 공용 스타일
export const PageTitle = styled.h1`
    margin: 0 0 12px;
    font-size: 28px;
    font-weight: 700;
    color: ${props => props.theme.color.primary};
`;

// 페이지 설명문용 공용 스타일
export const PageDescription = styled.p`
    margin: 0;
    font-size: 14px;
    color: ${props => props.theme.color.subText};
`;
