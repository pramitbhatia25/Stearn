import { useEffect, useState } from "react";

function NewCharts({ selectedKeys, setSelectedKeys }) {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchCoinHistory() {
        const baseUrl = "https://http-api.livecoinwatch.com/coins/history/range";
        const coins = ["SOL", "BTC", "ETH", "BNB", "XRP", "DOGE", "ADA", "DOT", "USDC", "USDT", "LINK", "TRX", "AVAX", "SHIB", "TONCOIN", "LTC", "HBAR", "DOT", "HYPE"];
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
                }));
                setCoins(formattedCoins);
                console.log(formattedCoins)
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="h-full flex flex-row w-full">
            {coins.map((coin) => {
                return <div className="bg-[#0f0311] mx-1 flex flex-row items-center border-black border rounded-lg cursor-pointer" key={coin['id']} onClick={() => {setSelectedKeys([coin.id])}}>
                    <div className="ml-5 mr-2.5 text-sm">
                        {coin.coin}
                    </div>
                    <div className="ml-2.5 mr-5 text-sm">
                        {coin.price}
                    </div>
                </div>
            })}
        </div>
    );
}

export default NewCharts;