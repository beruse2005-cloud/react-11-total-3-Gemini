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

const DEFAULT_ROCKET_IMAGE = "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png";

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
                    const imageUrl = item.links.patch.small ?? DEFAULT_ROCKET_IMAGE;
                    const statusText =
                        item.success === true
                            ? "발사 성공"
                            : item.success === false
                              ? "발사 실패"
                              : "발사 예정/미정";

                    return (
                        <RocketCard to={`/rocket/${item.id}`} key={item.id}>
                            <Thumbnail src={imageUrl} alt={item.name} />
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
