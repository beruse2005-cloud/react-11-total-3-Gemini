// URL 파라미터 id로 특정 로켓 발사 상세 정보를 조회해 출력
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { type LaunchItem } from "../styles/rocket.ts";
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

const DEFAULT_ROCKET_IMAGE = "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png";

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
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <StatusMessage>LOADING...</StatusMessage>;
    }

    if (!launch) {
        return <StatusMessage>로켓 발사 정보를 찾을 수 없습니다.</StatusMessage>;
    }

    const imageUrl = launch.links.patch.large ?? launch.links.patch.small ?? DEFAULT_ROCKET_IMAGE;

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
                <DetailImage src={imageUrl} alt={launch.name} />
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
