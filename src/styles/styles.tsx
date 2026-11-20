// 여러 페이지에서 공통으로 재사용하는 메인 컨테이너 및 타이포그래피/카드 스타일
import styled from "styled-components";

export const Main = styled.main`
    flex: 1; // MainLayout이 세로 flex이므로 헤더와 푸터 사이 남은 높이를 모두 채움
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 32px;
`;

export const SectionCard = styled.section`
    border-radius: 12px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    padding: 24px;
`;

export const PageTitle = styled.h1`
    margin: 0 0 12px;
    font-size: 28px;
    font-weight: 700;
    color: ${props => props.theme.color.primary};
`;

export const PageDescription = styled.p`
    margin: 0;
    font-size: 14px;
    color: ${props => props.theme.color.subText};
`;
