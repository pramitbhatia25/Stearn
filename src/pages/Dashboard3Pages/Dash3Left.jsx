import { useEffect, useState } from "react";
import { CompanyProfile, MiniChart, SingleTicker, SymbolInfo } from "react-ts-tradingview-widgets";

function Dash3Left({coin}) {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCoinHistory() {
        const baseUrl = "https://http-api.livecoinwatch.com/coins/history/range";
        const coins = [coin];
        const currency = "USD";
        const end = Date.now();
        const start = end - 6000000;

        try {
            const requests = coins.map(async (coin) => {
                try {
                    const url = `${baseUrl}?coin=${coin}&start=${start}&end=${end}&currency=${currency}`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${coin}: ${response.statusText}`);
                    }
                    const data = await response.json();
                    return { coin, data };
                } catch (coinError) {
                    console.error(`Error fetching ${coin}:`, coinError);
                    return {
                        coin: coin, data: [
                            {
                                "date": 1739035500000,
                                "rate": 0,
                                "volume": 275507438,
                                "cap": 9383557151
                            }]
                    }
                }
            });

            const results = await Promise.all(requests);
            return results.filter(result => result !== null);
        } catch (error) {
            console.error("Error in the overall fetch process:", error);
            throw error;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCoinHistory();
                const formattedCoins = response.map(({ coin, data }, index) => ({
                    id: index + 1,
                    coin: coin.toUpperCase(),
                    price:
                        data?.data?.length > 0
                            ? data.data[data.data.length - 1].rate.toFixed(2)
                            : "N/A",
                    cap:
                        data?.data?.length > 0
                            ? data.data[data.data.length - 1].cap.toFixed(2)
                            : "N/A",
                    volume:
                        data?.data?.length > 0
                            ? data.data[data.data.length - 1].volume.toFixed(2)
                            : "N/A",
                        }));
                setData(formattedCoins);
                console.log(formattedCoins)
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col w-full">
            <div className="h-[45%] overflow-hidden">
                <SymbolInfo symbol="BTCUSD" colorTheme="light" autosize></SymbolInfo>
            </div>

            <div className="h-[55%] overflow-y-auto overflow-x-hidden">
                <CompanyProfile symbol={"BTCUSD"} colorTheme="light" height={400} width="100%"></CompanyProfile>
            </div>
        </div>
    );
}

export default Dash3Left;