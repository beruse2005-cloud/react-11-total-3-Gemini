// SpaceX 로켓 발사 타입 및 대체 데이터 정의 (.ts)
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

// SpaceX API가 522 타임아웃 등으로 응답하지 않을 때 사용할 대체 목록
export const FALLBACK_LAUNCHES: LaunchItem[] = [
    {
        id: "5eb87cd9ffd86e000604b32a",
        name: "FalconSat",
        date_utc: "2006-03-24T22:30:00.000Z",
        success: false,
        details: "Engine failure at 33 seconds and loss of vehicle",
        flight_number: 1,
        links: {
            patch: {
                small: "https://images2.imgbox.com/94/f2/NNbIa5lR_o.png",
                large: "https://images2.imgbox.com/5b/02/QcxHUb5V_o.png",
            },
        },
    },
    {
        id: "5eb87cdaffd86e000604b32b",
        name: "DemoSat",
        date_utc: "2007-03-21T01:10:00.000Z",
        success: false,
        details:
            "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit",
        flight_number: 2,
        links: {
            patch: {
                small: "https://images2.imgbox.com/f9/4a/ZboXReNb_o.png",
                large: "https://images2.imgbox.com/80/3e/ucX4h6E6_o.png",
            },
        },
    },
    {
        id: "5eb87cdbffd86e000604b32c",
        name: "Trailblazer",
        date_utc: "2008-08-03T03:34:00.000Z",
        success: false,
        details: "Residual stage 1 thrust led to collision between stage 1 and stage 2",
        flight_number: 3,
        links: {
            patch: {
                small: "https://images2.imgbox.com/6c/cb/na1tzhHs_o.png",
                large: "https://images2.imgbox.com/4a/80/k1oAkY0k_o.png",
            },
        },
    },
    {
        id: "5eb87cddffd86e000604b32d",
        name: "RatSat",
        date_utc: "2008-09-28T23:15:00.000Z",
        success: true,
        details: "Ratsat was launched to orbit on September 28, 2008",
        flight_number: 4,
        links: {
            patch: {
                small: "https://images2.imgbox.com/95/39/sRqN7rSV_o.png",
                large: "https://images2.imgbox.com/a1/55/Quit6l0N_o.png",
            },
        },
    },
];
