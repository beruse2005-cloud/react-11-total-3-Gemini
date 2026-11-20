import { useEffect, useState } from "react";
import { FALLBACK_LAUNCHES, type LaunchItem } from "../styles/rocket.ts";
import {
    LoadingBox,
    Container,
    Title,
    ListWrap,
    RocketCard,
    Thumbnail,
    Info,
    Name,
    Status,
} from "./styles/RocketList.ts";

// 외부 imgbox 썸네일이 깨지거나 임시 불가일 때 쓸 깔끔한 기본 SVG 데이터 URI
const DEFAULT_ROCKET_IMAGE =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
            <rect width="300" height="300" fill="#eef2ff" />
            <text x="150" y="145" text-anchor="middle" fill="#1d6feb" font-size="22" font-family="sans-serif" font-weight="bold">SPACEX</text>
            <text x="150" y="175" text-anchor="middle" fill="#6b7280" font-size="14" font-family="sans-serif">Launch Patch</text>
        </svg>
    `);

function RocketList() {
    const [list, setList] = useState<LaunchItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.spacexdata.com/v4/launches")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP 오류: ${res.status}`);
                }
                return res.json();
            })
            .then((json: LaunchItem[]) => {
                if (!Array.isArray(json) || json.length === 0) {
                    setList(FALLBACK_LAUNCHES);
                    return;
                }
                const recentLaunches = [...json]
                    .sort((a, b) => b.flight_number - a.flight_number)
                    .slice(0, 12);
                setList(recentLaunches);
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    console.log("SpaceX API 호출 실패, 대체 데이터 사용:", error.message);
                } else {
                    console.log("SpaceX API 호출 실패, 대체 데이터 사용:", error);
                }
                setList(FALLBACK_LAUNCHES);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <LoadingBox>LOADING...</LoadingBox>;
    }

    if (list.length === 0) {
        return <LoadingBox>로켓 발사 정보를 찾을 수 없거나, 오류가 발생 되었습니다.</LoadingBox>;
    }

    return (
        <Container>
            <Title>스페이스X 로켓 발사 목록</Title>
            <ListWrap>
                {list.map(item => {
                    // imgbox 썸네일이 불안정할 수 있으므로 기본 로켓 이미지로 통일하거나 필요 시 item.links.patch.small 사용
                    const imageUrl = DEFAULT_ROCKET_IMAGE;
                    const statusText =
                        item.success === true
                            ? "발사 성공"
                            : item.success === false
                                ? "발사 실패"
                                : "발사 예정/미정";

                    return (
                        <RocketCard to={`/rocket/${item.id}`} key={item.id}>
                            <Thumbnail
                                src={imageUrl}
                                alt={item.name}
                                onError={e => {
                                    e.currentTarget.src = DEFAULT_ROCKET_IMAGE;
                                }}
                            />
                            <Info>
                                <Name>{item.name}</Name>
                                <Status>{statusText}</Status>
                            </Info>
                        </RocketCard>
                    );
                })}
            </ListWrap>
        </Container>
    );
}

export default RocketList;