import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinTickers } from "../api";
import { isDarkAtom } from "../atoms";

interface PriceProps {
    coinId: string;
}

interface IState {
    id: string;
    quotes: {
        USD : {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    }
}

function Price({coinId}: PriceProps) {
    const isDark = useRecoilValue(isDarkAtom);
    
    const {isLoading, data} = useQuery<IState>(
        ["tickers", coinId], () => fetchCoinTickers(coinId),
        {
            refetchInterval: 10000, 
        }
    );
    
    const nowUSD = data?.quotes.USD as any;
    const priceData = [
        nowUSD.percent_change_1y,
        nowUSD.percent_change_30d,
        nowUSD.percent_change_7d,
        nowUSD.percent_change_24h,
        nowUSD.percent_change_12h,
        nowUSD.percent_change_6h,
        nowUSD.percent_change_1h,
        nowUSD.percent_change_30m,
        nowUSD.percent_change_15m,
    ];
    const CATEGORIES = [
        "a year ago", 
        "30 days ago", 
        "7 days ago", 
        "24 hours ago", 
        "12 hours ago", 
        "6 hours ago", 
        "1 hour ago", 
        "30 minutes ago", 
        "15 minutes ago",  
    ];

    return <div>
        {isLoading ? "Loading chart..." : 
            <ApexChart 
                type="line" 
                series={[
                    {
                        name: "Price",
                        data: priceData as number[],
                    },
                ]}
                options={{
                    theme: {
                        mode: isDark? "dark": "light",
                    },
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    stroke: {
                        curve: "smooth",
                        width: 3,
                    },
                    grid: {
                        show: false,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        labels: { show: false },
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                        categories: CATEGORIES,
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            gradientToColors: ["#0be881"],
                            stops: [0, 100], 
                        },
                    },
                    colors: ["#0fbcf9"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$ ${((1+value/100) * (nowUSD.price as number)).toFixed(2)}`
                        },
                    },
                }}
            />
        }
    </div>;
}

export default Price;