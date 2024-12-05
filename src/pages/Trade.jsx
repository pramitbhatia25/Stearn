import { Avatar, Button, Card, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

const initialCryptoData = [
    {
        name: 'Bitcoin',
        id: 'BTC',
        imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        currentPrice: 0.0
    },
    {
        name: 'Ethereum',
        id: 'ETH',
        imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        currentPrice: 0.0
    },
    {
        name: 'Litecoin',
        id: 'LTC',
        imageUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
        currentPrice: 0.0
    },
    {
        name: 'Cardano',
        id: 'ADA',
        imageUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
        currentPrice: 0.0
    },
    {
        name: 'Binance Coin',
        id: 'BNB',
        imageUrl: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        currentPrice: 0.0
    },
    {
        name: 'Solana',
        id: 'SOL',
        imageUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png',
        currentPrice: 0.0
    },
    {
        name: 'Dogecoin',
        id: 'DOGE',
        imageUrl: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
        currentPrice: 0.0
    }
];

const Trade = () => {

    const [cryptoData, setCryptoData] = useState(initialCryptoData);
    const [loading, setLoading] = useState(true);
    const [fromValue, setFromValue] = useState(new Set(["BTC"]));
    const [toValue, setToValue] = useState(new Set(["SOL"]));
    const [fromAmount, setFromAmount] = useState(0.0);
    const [toAmount, setToAmount] = useState(0.0);

    const content = (
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Like what you see?</div>
            <div className="text-tiny">Join our waitlist to keep in touch with product updates!</div>
          </div>
        </PopoverContent>
      );
    
    const fetchCryptoPrices = async () => {
        setLoading(true)
        try {
            const response = await fetch(
                "https://api.coinlayer.com/live?access_key=519f676ff9626a5d83d1f5659b1fa546"
            );
            const data = await response.json();

            if (data.success && data.rates) {
                const updatedData = cryptoData.map((crypto) => ({
                    ...crypto,
                    currentPrice: data.rates[crypto.id] || crypto.currentPrice, // Update if found in API
                }));

                setCryptoData(updatedData);
            }
        } catch (error) {
            console.error("Error fetching crypto prices:", error);
        }
        setLoading(false)
    };

    useEffect(() => {
        fetchCryptoPrices();
    }, []);

    useEffect(() => {
        const fromCrypto = cryptoData.find((crypto) => crypto.id === Array.from(fromValue)[0]);
        const toCrypto = cryptoData.find((crypto) => crypto.id === Array.from(toValue)[0]);
    
        if (fromCrypto && toCrypto) {
            if (fromAmount > 0) {
                const calculatedToAmount = (fromAmount * fromCrypto.currentPrice) / toCrypto.currentPrice;
                setToAmount(calculatedToAmount.toFixed(4));
            } else if (toAmount > 0) {
                const calculatedFromAmount = (toAmount * toCrypto.currentPrice) / fromCrypto.currentPrice;
                setFromAmount(calculatedFromAmount.toFixed(4));
            }
        }
    }, [fromValue, toValue, cryptoData]);
    
    const handleFromAmountChange = (value) => {
        setFromAmount(value);

        const fromCrypto = cryptoData.find((crypto) => crypto.id === Array.from(fromValue)[0]);
        const toCrypto = cryptoData.find((crypto) => crypto.id === Array.from(toValue)[0]);

        if (fromCrypto && toCrypto && value) {
            const calculatedToAmount = (value * fromCrypto.currentPrice) / toCrypto.currentPrice;
            setToAmount(calculatedToAmount.toFixed(4));
        }
    };

    const handleToAmountChange = (value) => {
        setToAmount(value);

        const fromCrypto = cryptoData.find((crypto) => crypto.id === Array.from(fromValue)[0]);
        const toCrypto = cryptoData.find((crypto) => crypto.id === Array.from(toValue)[0]);

        if (fromCrypto && toCrypto && value) {
            const calculatedFromAmount = (value * toCrypto.currentPrice) / fromCrypto.currentPrice;
            setFromAmount(calculatedFromAmount.toFixed(4));
        }
    };


    return (
            <Card className="w-[350px] h-[300px] border border-gray-900">
            {loading ? (
                <div className="flex items-center justify-center h-full w-full">
                    <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <span className="text-gray-700 font-medium">Fetching the latest crypto prices...</span>
                    </div>
                </div>
            ) : <>
                <div className="flex flex-col">
                    <div className="h-fit mx-5 py-5 border-b border-black/10">
                        <div className="flex flex-col">
                            <div className="mb-2 text-xs">
                                You Pay
                            </div>

                            <div className="flex flex-row gap-3">
                                <div className="text-xs">

                                    <Select
                                        items={cryptoData}
                                        size={"md"}
                                        variant="bordered"
                                        aria-label="hi"
                                        selectedKeys={fromValue}
                                        onSelectionChange={setFromValue}
                                        className="w-[175px]"
                                        renderValue={(items) => {
                                            return items.map((item) => (
                                                <div key={item.id} className="flex gap-2 items-center p-2">
                                                    <Avatar
                                                        alt={item.data.name}
                                                        className="flex-shrink-0 w-6 h-6 text-tiny"
                                                        size="sm"
                                                        src={item.data.imageUrl}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{item.data.name}</span>
                                                        <span className="text-default-700 text-xs">${item.data.currentPrice}</span>
                                                    </div>
                                                </div>
                                            ));
                                        }}
                                    >
                                        {(crypto) => (
                                            <SelectItem key={crypto.id} textValue={crypto.name}>
                                                <div className="flex gap-2 items-center p-2">
                                                    <Avatar alt={crypto.name} className="flex-shrink-0 w-6 h-6 text-tiny" src={crypto.imageUrl} />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{crypto.name}</span>
                                                        <span className="text-tiny text-default-700">{crypto.currentPrice}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>

                                </div>

                                <div className="text-xs">

                                    <Input
                                        className="h-full"
                                        size={"md"}
                                        type="number"
                                        onChange={(e) => handleFromAmountChange(e.target.value)}
                                        value={fromAmount}
                                        placeholder="0.00"
                                        labelPlacement="outside"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small"></span>
                                            </div>
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="h-fit mx-5 py-5 border-b border-black/10">
                        <div className="flex flex-col">
                            <div className="mb-2 text-xs">
                                You Receive
                            </div>

                            <div className="flex flex-row gap-3">
                                <div className="text-xs">

                                    <Select
                                        items={cryptoData}
                                        size={"md"}
                                        variant="bordered"
                                        aria-label="hi"
                                        className="w-[175px]"
                                        selectedKeys={toValue}
                                        onSelectionChange={setToValue}
                                        renderValue={(items) => {
                                            return items.map((item) => (
                                                <div key={item.id} className="flex gap-2 items-center p-2">
                                                    <Avatar
                                                        alt={item.data.name}
                                                        className="flex-shrink-0 w-6 h-6 text-tiny"
                                                        size="sm"
                                                        src={item.data.imageUrl}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{item.data.name}</span>
                                                        <span className="text-default-700 text-xs">${item.data.currentPrice}</span>
                                                    </div>
                                                </div>
                                            ));
                                        }}
                                    >
                                        {(crypto) => (
                                            <SelectItem key={crypto.id} textValue={crypto.name}>
                                                <div className="flex gap-2 items-center p-2">
                                                    <Avatar alt={crypto.name} className="flex-shrink-0 w-6 h-6 text-tiny" src={crypto.imageUrl} />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{crypto.name}</span>
                                                        <span className="text-tiny text-default-700">{crypto.currentPrice}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>

                                </div>

                                <div className="text-xs">

                                    <Input
                                        className="h-full"
                                        size={"md"}
                                        type="number"
                                        value={toAmount}
                                        onChange={(e) => handleToAmountChange(e.target.value)}
                                        placeholder="0.00"
                                        labelPlacement="outside"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small"></span>
                                            </div>
                                        }
                                    />


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 m-auto w-[300px]">
                <Popover key={"secondary"} placement="top" color={"secondary"}>
                <PopoverTrigger>
                    <Button color="secondary" auto className="mb-5 py-3 px-8 w-full">
                        Execute Trade
                    </Button>
                </PopoverTrigger>
                {content}
          </Popover>

                </div>      
                
            </>}

            </Card>
    );
};

export default Trade;
