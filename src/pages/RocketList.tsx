// SpaceX 발사 목록을 불러와 카드로 보여주고 클릭 시 /rocket/:id 상세로 이동
import { useEffect, useState } from "react";
import {
    Container,
    Info,
    ListWrap,
    LoadingBox,
    Name,
    RocketCard,
    Status,
    Thumbnail,
    Title,
} from "./styles/RocketList.ts";


export type LaunchItem = {
    id: string;
    name: string;
    date_utc: string;
    success: boolean | null;
    details: string | null;
    flight_number: number;
    links: {
        patch: {
            small: string | null;
            large: string | null;
        };
    };
};

const DEFAULT_ROCKET_IMAGE = "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png";

function RocketList() {
    const [list, setList] = useState<LaunchItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.spacexdata.com/v4/launches")
            .then(res => {
                if (!res.ok) {
                    throw new Error("로켓 발사 데이터를 불러오지 못했습니다.");
                }
                return res.json();
            })
            .then((json: LaunchItem[]) => {
                // 최신 flight_number 순으로 정렬해 상위 12개만 노출
                const recentLaunches = [...json]
                    .sort((a, b) => b.flight_number - a.flight_number)
                    .slice(0, 12);
                setList(recentLaunches);
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log(error);
                }
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
