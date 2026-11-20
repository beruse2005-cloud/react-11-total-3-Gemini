// src/styles/styled.d.ts
import "styled-components";
import type { LightTheme } from "./theme.ts";

type AppTheme = typeof LightTheme;

// styled-components의 DefaultTheme에 LightTheme의 프로퍼티를 확장 선언
declare module "styled-components" {
    export interface DefaultTheme {
        color: AppTheme["color"];
    }
}
