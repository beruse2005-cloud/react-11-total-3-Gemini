// 코인 목록 선택 및 우측 상세 카드(현재 가격, 시가총액, 24시간 거래량, 순위) 표시
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCoins } from "react-icons/fa";

type CoinMarket = {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
};

// 네트워크 오류나 API 제한 상황에서도 화면을 유지하기 위한 기본 코인 데이터
const FALLBACK_COINS: CoinMarket[] = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        current_price: 62622.24,
        market_cap: 1250619507970,
        total_volume: 103996659959,
        market_cap_rank: 1,
        price_change_percentage_24h: 1.42,
    },
    {
        id: "mantle",
        name: "Mantle",
        symbol: "mnt",
        current_price: 0.382,
        market_cap: 1280000000,
        total_volume: 94500000,
        market_cap_rank: 42,
        price_change_percentage_24h: 2.95,
    },
    {
        id: "internet-computer",
        name: "Internet Computer (IOU)",
        symbol: "icp",
        current_price: 2.24,
        market_cap: 1050000000,
        total_volume: 68200000,
        market_cap_rank: 43,
        price_change_percentage_24h: -1.0,
    },
    {
        id: "first-digital-usd",
        name: "First Digital USD",
        symbol: "fdusd",
        current_price: 0.996,
        market_cap: 990000000,
        total_volume: 3200000000,
        market_cap_rank: 44,
        price_change_percentage_24h: -0.1,
    },
    {
        id: "polkadot",
        name: "Polkadot",
        symbol: "dot",
        current_price: 0.715,
        market_cap: 1120000000,
        total_volume: 142000000,
        market_cap_rank: 46,
        price_change_percentage_24h: -2.14,
    },
    {
        id: "pax-gold",
        name: "PAX Gold",
        symbol: "paxg",
        current_price: 3721.19,
        market_cap: 890000000,
        total_volume: 54000000,
        market_cap_rank: 47,
        price_change_percentage_24h: -1.77,
    },
];

const PageWrap = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 32px 48px;
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    gap: 24px;
    align-items: start;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

const SidebarCard = styled.aside`
    border-radius: 12px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    overflow: hidden;
`;

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 18px;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid ${props => props.theme.color.border};
`;

const CoinList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 620px;
    overflow-y: auto;
`;

// $active: DOM 속성에 남지 않도록 접두사 $를 붙인 스타일 전용 prop
const CoinRowButton = styled.button<{ $active: boolean }>`
    width: 100%;
    padding: 12px 18px;
    border: none;
    border-bottom: 1px solid ${props => props.theme.color.border};
    background-color: ${props => (props.$active ? "rgba(29, 111, 235, 0.1)" : "transparent")};
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    cursor: pointer;

    &:hover {
        background-color: rgba(29, 111, 235, 0.06);
    }
`;

const CoinName = styled.div`
    font-size: 13px;
    font-weight: 600;
`;

const CoinSymbol = styled.div`
    font-size: 11px;
    color: ${props => props.theme.color.subText};
    text-transform: uppercase;
    margin-top: 2px;
`;

const CoinRight = styled.div`
    text-align: right;
`;

const CoinPrice = styled.div`
    font-size: 13px;
    font-weight: 600;
`;

const CoinChange = styled.div<{ $positive: boolean }>`
    font-size: 11px;
    font-weight: 600;
    color: ${props => (props.$positive ? "#16a34a" : "#dc2626")};
    margin-top: 2px;
`;

const DetailPanel = styled.section`
    border-radius: 12px;
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    padding: 28px 32px;
    min-height: 360px;
`;

const DetailHeader = styled.div`
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding-bottom: 18px;
    border-bottom: 1px solid ${props => props.theme.color.border};
    margin-bottom: 24px;
`;

const DetailTitle = styled.h1`
    margin: 0;
    font-size: 26px;
    font-weight: 700;
    color: ${props => props.theme.color.primary};
`;

const DetailSymbol = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.color.subText};
    text-transform: uppercase;
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 540px) {
        grid-template-columns: 1fr;
    }
`;

const StatCard = styled.div`
    padding: 18px;
    border-radius: 10px;
    background-color: ${props => props.theme.color.muted};
`;

const StatLabel = styled.div`
    font-size: 12px;
    color: ${props => props.theme.color.subText};
    margin-bottom: 8px;
`;

const StatValue = styled.div`
    font-size: 18px;
    font-weight: 700;
    word-break: break-word;
`;

function formatUsd(num: number): string {
    if (num >= 1) {
        return `$${num.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
    }
    return `$${num.toLocaleString("en-US", { maximumFractionDigits: 4 })}`;
}

function formatIntegerUsd(num: number): string {
    return `$${Math.round(num).toLocaleString("en-US")}`;
}

function CoinPage() {
    const [coins, setCoins] = useState<CoinMarket[]>(FALLBACK_COINS);
    const [selectedId, setSelectedId] = useState<string>("bitcoin");

    useEffect(() => {
        let active = true;

        fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
        )
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch coins");
                return res.json() as Promise<CoinMarket[]>;
            })
            .then(data => {
                if (!active || !Array.isArray(data) || data.length === 0) return;
                setCoins(data);
                setSelectedId(prev => (data.some(c => c.id === prev) ? prev : data[0].id));
            })
            .catch(() => {
                if (active) {
                    setCoins(FALLBACK_COINS);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const selectedCoin = coins.find(coin => coin.id === selectedId) ?? coins[0];
    const sidebarCoins = [...coins].reverse();

    return (
        <PageWrap>
            <SidebarCard>
                <SidebarHeader>
                    <FaCoins color="#eab308" size={14} />
                    <span>Top 50 Coins</span>
                </SidebarHeader>
                <CoinList>
                    {sidebarCoins.map(coin => {
                        const change = coin.price_change_percentage_24h ?? 0;
                        const isPositive = change >= 0;

                        return (
                            <li key={coin.id}>
                                <CoinRowButton
                                    type="button"
                                    $active={coin.id === selectedCoin?.id}
                                    onClick={() => setSelectedId(coin.id)}
                                >
                                    <div>
                                        <CoinName>{coin.name}</CoinName>
                                        <CoinSymbol>{coin.symbol}</CoinSymbol>
                                    </div>
                                    <CoinRight>
                                        <CoinPrice>{formatUsd(coin.current_price)}</CoinPrice>
                                        <CoinChange $positive={isPositive}>
                                            {isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%
                                        </CoinChange>
                                    </CoinRight>
                                </CoinRowButton>
                            </li>
                        );
                    })}
                </CoinList>
            </SidebarCard>

            <DetailPanel>
                {selectedCoin && (
                    <>
                        <DetailHeader>
                            <DetailTitle>{selectedCoin.name}</DetailTitle>
                            <DetailSymbol>{selectedCoin.symbol}</DetailSymbol>
                        </DetailHeader>

                        <StatGrid>
                            <StatCard>
                                <StatLabel>현재 가격 (USD)</StatLabel>
                                <StatValue>{formatUsd(selectedCoin.current_price)}</StatValue>
                            </StatCard>
                            <StatCard>
                                <StatLabel>시가총액</StatLabel>
                                <StatValue>{formatIntegerUsd(selectedCoin.market_cap)}</StatValue>
                            </StatCard>
                            <StatCard>
                                <StatLabel>24시간 거래량</StatLabel>
                                <StatValue>{formatIntegerUsd(selectedCoin.total_volume)}</StatValue>
                            </StatCard>
                            <StatCard>
                                <StatLabel>시가총액 순위</StatLabel>
                                <StatValue>{selectedCoin.market_cap_rank}위</StatValue>
                            </StatCard>
                        </StatGrid>
                    </>
                )}
            </DetailPanel>
        </PageWrap>
    );
}

export default CoinPage;