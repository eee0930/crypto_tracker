import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}


function Chart({coinId}: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcvs", coinId], () => fetchCoinHistory(coinId)
    );
    const chartData = data?.map((price) => {
        return {
            x: new Date(price.time_close*1000).toISOString(),
            y: [parseFloat(price.open),
            parseFloat(price.high),
            parseFloat(price.low),
            parseFloat(price.close)],
        };
    });
    return <div>
        {isLoading ? "Loading chart..." : 
            <ApexChart 
                type="candlestick" 
                series={[
                    {
                      data: chartData as any,
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
                        type: "datetime",
                        categories: data?.map((price) => new Date(price.time_close*1000).toISOString()),
                    },
                    plotOptions: {
                        candlestick: {
                            colors: {
                                upward: '#ed4b4b',
                                downward: '#588cd8'
                            }
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: (value) => `$ ${value.toFixed(2)}`
                        },
                    },
                }}
            />
        }
    </div>;
}

export default Chart;