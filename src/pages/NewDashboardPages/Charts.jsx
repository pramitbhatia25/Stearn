import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Spinner,
    Avatar,
} from "@nextui-org/react";

const SearchIcon = (props) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
        <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
    </svg>
);

function Charts({selectedKeys, setSelectedKeys}) {
    const [filterValue, setFilterValue] = useState("");
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const columns = [
        { name: "Coin", uid: "coin", sortable: true },
        { name: "Price", uid: "price", sortable: true },
    ];

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
                            ? data.data[data.data.length - 1].rate
                            : "N/A",
                }));
                setCoins(formattedCoins);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredItems = React.useMemo(() => {
        if (!filterValue) return coins;
        return coins.filter(coin =>
            coin.coin.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [coins, filterValue]);

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "id":
                return <span className="">{cellValue}</span>;
            case "coin":
                return (
                    <div className="flex flex-row">
                        <Avatar size={"sm"} src={`https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/${cellValue.toLowerCase()}.webp`} />
                        <div className="flex items-center justify-center px-2">
                            {cellValue}
                        </div>
                    </div>
                );
            case "price":
                return (
                    <span>
                        {
                            cellValue === "N/A"
                                ? "N/A"
                                : `$${Number(cellValue).toFixed(2)}`
                        }
                    </span>
                );
            default:
                return cellValue;
        }
    }, []);

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="h-full">
            <div className="mb-4 light">
                <Input
                    isClearable
                    className="w-full"
                    placeholder="Search by coin..."
                    startContent={<SearchIcon className="text-[#961aac]" />}
                    value={filterValue}
                    onClear={() => setFilterValue("")}
                    onValueChange={setFilterValue}
                />
            </div>

            <Table
                className="overflow-auto"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                selectionMode="single"
                removeWrapper
                hideHeader
                disallowEmptySelection
                aria-label="Cryptocurrency prices"
                classNames={{
                    table: "h-fit light",
                    tr: ""
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align="start"
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={isLoading ? "Loading..." : "No coins found"}
                    items={filteredItems}
                    loadingContent={<Spinner color="secondary" />}
                    loadingState={isLoading ? "loading" : "idle"}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default Charts;