import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FALLBACK_LAUNCHES, type LaunchItem } from "../styles/rocket.ts";
import {
    BackBtn,
    Badge,
    Container,
    Content,
    Description,
    DetailImage,
    Info,
    MetaList,
    StatusMessage,
    StatusText,
    Title,
} from "./styles/RocketDetail.ts";

const DEFAULT_ROCKET_IMAGE =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
            <rect width="320" height="320" fill="#eef2ff" />
            <text x="160" y="155" text-anchor="middle" fill="#1d6feb" font-size="24" font-family="sans-serif" font-weight="bold">SPACEX</text>
            <text x="160" y="185" text-anchor="middle" fill="#6b7280" font-size="14" font-family="sans-serif">Mission Detail</text>
        </svg>
    `);

function RocketDetail() {
    const { id } = useParams();
    const [launch, setLaunch] = useState<LaunchItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        setLoading(true);

        fetch(`https://api.spacexdata.com/v4/launches/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("상세 발사 정보를 불러오지 못했습니다.");
                }
                return res.json();
            })
            .then((json: LaunchItem) => setLaunch(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
                const fallbackItem = FALLBACK_LAUNCHES.find(item => item.id === id) ?? null;
                setLaunch(fallbackItem);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <StatusMessage>LOADING...</StatusMessage>;
    }

    if (!launch) {
        return <StatusMessage>로켓 발사 정보를 찾을 수 없습니다.</StatusMessage>;
    }

    const imageUrl = DEFAULT_ROCKET_IMAGE;

    const statusLabel =
        launch.success === true
            ? "발사 성공"
            : launch.success === false
              ? "발사 실패"
              : "발사 예정/미정";

    const formattedDate = new Date(launch.date_utc).toLocaleString("ko-KR");

    return (
        <Container>
            <BackBtn to={"/rocket"}>&larr; 목록으로</BackBtn>
            <Content>
                <DetailImage
                    src={imageUrl}
                    alt={launch.name}
                    onError={e => {
                        e.currentTarget.src = DEFAULT_ROCKET_IMAGE;
                    }}
                />
                <Info>
                    <Title>{launch.name}</Title>
                    <Description>
                        {launch.details ?? "상세 발사 설명 정보가 등록되지 않은 미션입니다."}
                    </Description>
                    <MetaList>
                        <li>
                            <Badge>Flight #{launch.flight_number}</Badge>
                        </li>
                        <li>발사 일시: {formattedDate}</li>
                        <StatusText>{statusLabel}</StatusText>
                    </MetaList>
                </Info>
            </Content>
        </Container>
    );
}

export default RocketDetail;
