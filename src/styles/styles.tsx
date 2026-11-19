// 여러 페이지에서 공통으로 쓸 수 있는 기본 메인 컨테이너
import styled from "styled-components";

export const Main = styled.main`
    flex: 1; // MainLayout이 세로 flex이므로 Header와 Footer 사이 남은 공간을 꽉 채움
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 32px;
`;
