// styled-components의 기본 DefaultTheme 인터페이스를 우리 프로젝트의 LightTheme 모양으로 확장
// 이렇게 해두어야 styled.div`...` 안에서 props.theme.color.primary 같은 자동완성과 타입 검사가 작동함
import "styled-components";
import { LightTheme } from "./theme.ts";

type AppTheme = typeof LightTheme;

declare module "styled-components" {
    export interface DefaultTheme extends AppTheme {}
}
