import { Accordion, AccordionItem, Avatar, AvatarGroup, Button, ButtonGroup, Card, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DynamicWidget, isAuthenticatedWithAWallet } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useUserWallets } from '@dynamic-labs/sdk-react-core'
import SwingSDK from '@swing.xyz/sdk';
import { Clock, Dot } from 'lucide-react';
import executeSwingTransaction from "../components/Transact";

const initialCryptoData = [
    {
        name: 'BTC',
        chain: "bitlayer",
        protocol: "EVM",
        tokenSymbol: "BTC",
        tokenAddress: "0x0000000000000000000000000000000000000000",
        id: '1',
        tokenImage: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        chainImage: "https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/chains/bitlayer/57fb9185ee21f8c8f235997f6e12ee682f764aa85f20b2ed5424637d0c37195a.png",
        decimals: 18,
        currentPrice: 0.0
    },
    {
        name: 'ETH',
        chain: "bitlayer",
        protocol: "EVM",
        tokenSymbol: "ETH",
        tokenAddress: "0xef63d4e178b3180beec9b0e143e0f37f4c93f4c2",
        id: '2',
        tokenImage: 'https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/assets/eth/e1d3ad487b02f352aded992c627a276195ace66f62e76d3e771cf61fb86c8b36.png',
        chainImage: "https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/chains/bitlayer/57fb9185ee21f8c8f235997f6e12ee682f764aa85f20b2ed5424637d0c37195a.png",
        decimals: 18,
        currentPrice: 0.0
    },
    {
        name: 'WBTC',
        chain: "bob",
        protocol: "EVM",
        tokenSymbol: "WBTC",
        tokenAddress: "0x03c7054bcb39f7b2e5b2c7acb37583e32d70cfa3",
        id: '3',
        tokenImage: 'https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/assets/wbtc/11f0fa5d53eb40bae9752610edf36e0d3187d01c8cdc3fdf1b88d33a3a70c793.png',
        chainImage: "https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/chains/bob/5f004bd6e475ed0f023fda0184d2342643b9b7072f8a922c7cc542d4acde4ed6.png",
        decimals: 8,
        currentPrice: 0.0
    },
    {
        name: 'SolvBTC',
        chain: "bob",
        protocol: "EVM",
        tokenSymbol: "SolvBTC",
        tokenAddress: "0x541FD749419CA806a8bc7da8ac23D346f2dF8B77",
        id: '4',
        tokenImage: 'https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/assets/solvbtc/5327c1ff61c060054bb9e0b7c9de3ce5c31faeca89a8ac2b489ea7d0ea5b5367.png',
        chainImage: "https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/chains/bob/5f004bd6e475ed0f023fda0184d2342643b9b7072f8a922c7cc542d4acde4ed6.png",
        decimals: 18,
        currentPrice: 0.0
    },
    {
        name: 'BTC',
        chain: "merlin",
        protocol: "EVM",
        tokenSymbol: "BTC",
        tokenAddress: "0x0000000000000000000000000000000000000000",
        id: '5',
        tokenImage: 'https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/assets/btc/19952c464ee97fc44c68e6d1d175772edef9df88676d1534a24e6c603fee6a58.png',
        chainImage: "https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/chains/merlin/9f271e2535ce3e037adb16dec98470631e4c4842c550cb6ea8c5b6d8fae6137f.png",
        decimals: 18,
        currentPrice: 0.0
    },
    {
        name: 'WBTC',
        chain: "merlin",
        protocol: "EVM",
        tokenSymbol: "WBTC",
        tokenAddress: "0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA",
        id: '6',
        tokenImage: 'https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/assets/wbtc/1a6c748aa2dfa0d47e39a164e92991daf527df84f9de8f28d2e94e30805c270a.png',
        chainImage: "https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/chains/merlin/9f271e2535ce3e037adb16dec98470631e4c4842c550cb6ea8c5b6d8fae6137f.png",
        decimals: 18,
        currentPrice: 0.0
    },
    {
        name: '0xBTC',
        chain: "arbitrum",
        protocol: "EVM",
        tokenSymbol: "WBTC",
        tokenAddress: "0x7cb16cb78ea464ad35c8a50abf95dff3c9e09d5d",
        id: '7',
        tokenImage: 'https://s3.ap-northeast-1.amazonaws.com/platform.swing.xyz/assets/0xbtc/42b8cd4248c2b9a75ec6a7a64af63b68d2d67a2125c809cd1c24c60c26b1b8f8.png',
        chainImage: "https://raw.githubusercontent.com/polkaswitch/assets/master/blockchains/arbitrum/info/logo.png",
        decimals: 8,
        currentPrice: 0.0
    },
    {
        name: 'ETH',
        chain: "arbitrum",
        protocol: "EVM",
        tokenSymbol: "ETH",
        tokenAddress: "0x0000000000000000000000000000000000000000",
        id: '8',
        tokenImage: 'https://raw.githubusercontent.com/polkaswitch/assets/master/blockchains/solana/assets/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/eth.jpg',
        chainImage: "https://raw.githubusercontent.com/polkaswitch/assets/master/blockchains/arbitrum/info/logo.png",
        decimals: 18,
        currentPrice: 0.0
    },
    {
        name: 'SOL',
        chain: "arbitrum",
        protocol: "EVM",
        tokenSymbol: "SOL",
        tokenAddress: "0x2bcc6d6cdbbdc0a4071e48bb3b969b06b3330c07",
        id: '9',
        tokenImage: 'https://raw.githubusercontent.com/polkaswitch/assets/master/blockchains/osmosis/assets/ibc/1E43D59E565D41FB4E54CA639B838FFD5BCFC20003D330A56CB1396231AA1CBA/logo.png',
        chainImage: "https://raw.githubusercontent.com/polkaswitch/assets/master/blockchains/arbitrum/info/logo.png",
        decimals: 9,
        currentPrice: 0.0
    },
    {
        name: 'ETH',
        chain: "ethereum",
        protocol: "EVM",
        tokenSymbol: "ETH",
        tokenAddress: "0x0000000000000000000000000000000000000000",
        id: '10',
        tokenImage: 'https://raw.githubusercontent.com/polkaswitch/assets/master/blockchains/solana/assets/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/eth.jpg',
        chainImage: "https://raw.githubusercontent.com/polkaswitch/assets/master/blockchains/solana/assets/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/eth.jpg",
        decimals: 18,
        currentPrice: 0.0
    }

];

const Trade = () => {
    const { user } = useDynamicContext();

    if (user) {
        const authenticatedWithAWallet = isAuthenticatedWithAWallet(user)
        console.log(authenticatedWithAWallet)
    }

    const ChevronDownIcon = () => {
        return (
            <svg fill="none" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                    fill="currentColor"
                />
            </svg>
        );
    };

    const [cryptoData, setCryptoData] = useState(initialCryptoData);
    const [fromValue, setFromValue] = useState(new Set(["10"]));
    const [toValue, setToValue] = useState(new Set(["8"]));
    const [fromAmount, setFromAmount] = useState();
    const [toAmount, setToAmount] = useState();
    const userWallets = useUserWallets()
    const [selectedFromOption, setSelectedFromOption] = useState("");
    const [selectedToOption, setSelectedToOption] = useState("");
    const [loading, setLoading] = useState(false)
    const [allQuotes, setAllQuotes] = useState(null)
    const [receivedQuote, setReceivedQuote] = useState(null)
    const [selectedQuoteOption, setSelectedQuoteOption] = useState(new Set(["0"]))
    const [executionResult, setExecutionResult] = useState(false)

    useEffect(() => {
        if (userWallets.length > 0 && !selectedFromOption) {
            setSelectedFromOption(userWallets[0].id);
            setSelectedToOption(userWallets[0].id);
        }

    }, [userWallets, selectedFromOption, selectedToOption]);

    useEffect(() => {
        setReceivedQuote(null)
        setExecutionResult(null)
        setAllQuotes(null)
    }, [fromValue, toValue])

    useEffect(() => {
        if (!receivedQuote || selectedQuoteOption.size === 0) {
            return; // Do nothing if no quote is received or no option is selected.
        }
    
        if (receivedQuote) {
            console.log(allQuotes);
            const selectedOption = Array.from(selectedQuoteOption)[0];
            console.log(selectedOption);
    
            const calculateTotalFeeUSD = (quote) => {
                return quote.quote.fees.reduce((sum, fee) => sum + parseFloat(fee.amountUSD), 0);
            };
    
            if (selectedOption === "0") {
                console.log("Calculating best price...");
                const bestPriceQuote = allQuotes.reduce((prev, curr) => {
                    const prevTotalFeeUSD = calculateTotalFeeUSD(prev);
                    const currTotalFeeUSD = calculateTotalFeeUSD(curr);
        
                    return prevTotalFeeUSD < currTotalFeeUSD ? prev : curr;
                });
                console.log(bestPriceQuote);
                setReceivedQuote(bestPriceQuote);
            } else if (selectedOption === "1") {
                console.log("Calculating fastest quote...");
                const fastestQuote = allQuotes.reduce((prev, curr) => {
                    const prevDuration = parseFloat(prev.duration);
                    const currDuration = parseFloat(curr.duration);
                    return prevDuration < currDuration ? prev : curr;
                });
                console.log(fastestQuote);
                setReceivedQuote(fastestQuote);
            }
        }
    }, [selectedQuoteOption]);

    
    const handleFromWalletChange = (selection) => {
        const walletId = Array.isArray(selection) ? selection[0] : [...selection][0];
        setSelectedFromOption(walletId);
        setReceivedQuote(null)
        setExecutionResult(null)
        setAllQuotes(null)
    };

    const handleToWalletChange = (selection) => {
        const walletId = Array.isArray(selection) ? selection[0] : [...selection][0];
        setSelectedToOption(walletId);
        setReceivedQuote(null)
        setExecutionResult(null)
        setAllQuotes(null)
    };

    const selectedFromWalletAddress = userWallets.find((wallet) => wallet.id === selectedFromOption)?.address || "Select Wallet";
    const selectedToWalletAddress = userWallets.find((wallet) => wallet.id === selectedToOption)?.address || "Select Wallet";

    const handleFromAmountChange = (value) => {
        setFromAmount(value);
        setReceivedQuote(null)
        setExecutionResult(null)
        setAllQuotes(null)
    };

    const handleToAmountChange = (value) => {
        setToAmount(value);
    };

    const QuoteCard = ({ quoteData }) => {

        if (!quoteData || Object.keys(quoteData).length === 0) {
            return <div>
                <div className="p-5">
                    <Card className="">
                        <div className="p-5 flex flex-col gap-0.5">
                            No Routes Found
                        </div>
                    </Card>
                </div>
            </div>
        }

        else {
            const fromTokenData = initialCryptoData.find(item => item.id === [...fromValue][0])
            const toTokenData = initialCryptoData.find(item => item.id === [...toValue][0])

            const amountToReceiveParsed = parseFloat(quoteData?.quote.amount) / Math.pow(10, quoteData?.quote.decimals);
            const amountToReceiveParsedUSD = quoteData?.quote.amountUSD;

            const totalUsdFee = quoteData?.quote.fees.reduce((sum, fee) => sum + parseFloat(fee.amountUSD), 0).toFixed(2);

            const transactionFees = quoteData?.quote.fees.reduce((acc, fee) => {
                const amount = (parseFloat(fee.amount) / Math.pow(10, fee.decimals)).toFixed(6);
                const usdFeeAmount = fee.amountUSD
                acc[fee.type] = [amount, fee.tokenSymbol, fee.chainSlug, usdFeeAmount, fee.type]
                return acc;
            }, {});

            console.log(transactionFees)

            const integration = quoteData?.quote.integration
            const duration = quoteData?.duration

            return (
                <div>
                    <div className="p-5">
                        <Card className="">
                            <div className="p-5 flex flex-col gap-0.5">
                                <div className="font-bold flex flex-row gap-1 items-end">
                                    <div className="text-lg font-bold">{amountToReceiveParsed}</div>
                                    <div className="">{toTokenData.tokenSymbol}</div>
                                </div>
                                <div className="flex flex-row gap-1 items-end">
                                    <div className="text-xs text-[gray]">${amountToReceiveParsedUSD} USD</div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="text-xs text-[red]">${totalUsdFee} Fees</div>
                                    <Dot color={"gray"} />
                                    <div className="text-xs text-[gray]"> {integration.charAt(0).toUpperCase() + integration.slice(1)} </div>
                                    <Dot color={"gray"} />
                                    <div className="text-xs text-[gray] flex justify-between gap-1"> <Clock className="w-4 h-4 inline" /> ~{duration} minutes</div>
                                </div>
                                <Divider className="my-2" />
                                <div className="flex flex-col gap-1">
                                    {
                                        Object.keys(transactionFees).map(key => {
                                            const [amount, tokenSymbol, chainSlug, amountUSD] = transactionFees[key];
                                            if (parseFloat(amountUSD) !== 0) {
                                                return (
                                                    <div key={key} className="flex justify-between items-center">
                                                        <div className="text-[11px]">
                                                            {key.charAt(0).toUpperCase() + key.slice(1)} Fee on {chainSlug.charAt(0).toUpperCase() + chainSlug.slice(1)}
                                                        </div>
                                                        <div className="text-[12px] text-[red]">
                                                            {amount} {tokenSymbol} (${amountUSD})
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null
                                                ;
                                        })
                                    }
                                </div>
                            </div>
                        </Card>

                    </div>

                </div>
            );
        }
    };

    async function getQuote() {
        setLoading(true)
        const fromTokenData = initialCryptoData.find(item => item.id === [...fromValue][0]);
        const toTokenData = initialCryptoData.find(item => item.id === [...toValue][0]);

        const fromChain = fromTokenData.chain;
        const fromTokenSymbol = fromTokenData.tokenSymbol;
        const fromTokenAddress = fromTokenData.tokenAddress;
        const fromUserAddress = selectedFromWalletAddress;
        const fromTokenDecimal = fromTokenData.decimals;

        const toChain = toTokenData.chain;
        const toTokenSymbol = toTokenData.tokenSymbol;
        const toTokenAddress = toTokenData.tokenAddress;
        const toUserAddress = selectedToWalletAddress;

        const tokenAmount = (fromAmount * Math.pow(10, fromTokenDecimal)).toString();

        console.log(tokenAmount)

        if(isNaN(tokenAmount) || tokenAmount === "0") {
            setLoading(false)
            setReceivedQuote({})
            setExecutionResult(null)
            setAllQuotes({})
            return
        }

        const queryParams = new URLSearchParams({
            fromChain,
            tokenSymbol: fromTokenSymbol,
            fromTokenAddress,
            fromUserAddress,
            toChain,
            toTokenSymbol,
            toTokenAddress,
            toUserAddress,
            tokenAmount,
        });

        const apiUrl = `https://platform.swing.xyz/api/v1/projects/testing-pramit/quote?${queryParams.toString()}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'x-swing-environment': 'testnet', // Change to 'production' when in production
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching quote: ${response.statusText}`);
            }

            const quote = await response.json();

            if (quote.routes.length == 0) {
                console.log("No Routes Found!");
                setLoading(false)
                setReceivedQuote({})
                setExecutionResult(null)
                setAllQuotes({})
            }
            else {
                const transferRoute = quote.routes[0];
                console.log(transferRoute);
                setLoading(false)
                setReceivedQuote(transferRoute)
                setAllQuotes(quote.routes)
            }
        } catch (error) {
            console.error('Error getting quote:', error);
            setLoading(false)
        }
    }


    async function executeCustomTransaction() {
        setExecutionResult("Loading")
        const fromTokenData = initialCryptoData.find(item => item.id === [...fromValue][0]);
        const toTokenData = initialCryptoData.find(item => item.id === [...toValue][0]);

        const fromChain = fromTokenData.chain;
        const fromTokenSymbol = fromTokenData.tokenSymbol;
        const fromTokenAddress = fromTokenData.tokenAddress;
        const fromUserAddress = selectedFromWalletAddress;
        const fromTokenDecimal = fromTokenData.decimals;

        const toChain = toTokenData.chain;
        const toTokenSymbol = toTokenData.tokenSymbol;
        const toTokenAddress = toTokenData.tokenAddress;
        const toUserAddress = selectedToWalletAddress;

        const tokenAmount = (fromAmount * Math.pow(10, fromTokenDecimal)).toString();

        const transactionDeets = await executeSwingTransaction(fromChain, fromTokenSymbol, fromTokenAddress, fromUserAddress, fromTokenDecimal, toChain, toTokenSymbol, toTokenAddress, toUserAddress, tokenAmount, receivedQuote)
        console.log(transactionDeets)
        setExecutionResult(transactionDeets)
    }


    return (
        <Card className="light min-w-[350px] w-full h-fit border border-gray-900">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg blur opacity-30 transition duration-500 group-hover:opacity-100"></div>
            <div className="flex flex-col"> 
                <div className="flex flex-col w-full">
                    <div className="h-fit mx-5 py-5 border-b border-black/10">
                        <div className="mb-5 text-md font-bold">
                           Swap With Stearn
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-2 flex flex-row justify-between items-center">
                                <div className="text-xs">
                                    You Pay
                                </div>


                                <ButtonGroup size="sm" className="w-fit" variant="flat">
                                    <Button>{selectedFromWalletAddress != "Select Wallet" ? <>{selectedFromWalletAddress.slice(0, 5)} ... {selectedFromWalletAddress.slice(-5)}</> : <>Select Wallet</>}</Button>
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <Button isIconOnly>
                                                <ChevronDownIcon />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            aria-label="Wallet Options"
                                            selectionMode="single"
                                            selectedKeys={new Set([selectedFromOption])}
                                            onSelectionChange={handleFromWalletChange}
                                        >
                                            {userWallets.map((wallet) => (
                                                <DropdownItem key={wallet.id}>
                                                    {wallet.address.slice(0, 5)}...{wallet.address.slice(-5)}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </ButtonGroup>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="text-xs">

                                    <Select
                                        items={cryptoData}
                                        size={"lg"}
                                        variant="flat"
                                        aria-label="hi"
                                        selectedKeys={fromValue}
                                        onSelectionChange={setFromValue}
                                        className="w-[full]"
                                        renderValue={(items) => {
                                            return items.map((item) => (
                                                <div key={item.id} className="flex gap-2 items-center p-2">
                                                    <AvatarGroup isBordered>
                                                        <Avatar className="flex-shrink-0 w-6 h-6" src={item.data.tokenImage} />
                                                        <Avatar size="sm" className="flex-shrink-0 w-6 h-6" src={item.data.chainImage} />
                                                    </AvatarGroup>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{item.data.name}</span>
                                                        <span className="text-default-700 text-xs">{item.data.chain.charAt(0).toUpperCase() + item.data.chain.slice(1)}</span>
                                                    </div>
                                                </div>
                                            ));
                                        }}
                                    >
                                        {(crypto) => (
                                            <SelectItem key={crypto.id} textValue={crypto.name}>
                                                <div className="flex gap-2 items-center p-2">
                                                    <Avatar alt={crypto.name} className="flex-shrink-0 w-6 h-6 text-tiny" src={crypto.tokenImage} />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{crypto.name}</span>
                                                        <span className="text-tiny text-default-700">{crypto.chain.charAt(0).toUpperCase() + crypto.chain.slice(1)}</span>
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
                            <div className="mb-2 flex flex-row justify-between items-center">
                                <div className="text-xs">
                                    You Receive
                                </div>


                                <ButtonGroup size="sm" className="w-fit" variant="flat">
                                    <Button>{selectedToWalletAddress != "Select Wallet" ? <>{selectedToWalletAddress.slice(0, 5)} ... {selectedToWalletAddress.slice(-5)}</> : <>Select Wallet</>}</Button>
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <Button isIconOnly>
                                                <ChevronDownIcon />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            aria-label="Wallet Options"
                                            selectionMode="single"
                                            selectedKeys={new Set([selectedToOption])}
                                            onSelectionChange={handleToWalletChange}
                                        >
                                            {userWallets.map((wallet) => (
                                                <DropdownItem key={wallet.id}>
                                                    {wallet.address.slice(0, 5)}...{wallet.address.slice(-5)}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </ButtonGroup>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="text-xs">

                                    <Select
                                        items={cryptoData}
                                        size={"lg"}
                                        variant="flat"
                                        aria-label="hi"
                                        className="w-[full]"
                                        selectedKeys={toValue}
                                        onSelectionChange={setToValue}
                                        renderValue={(items) => {
                                            return items.map((item) => (
                                                <div key={item.id} className="flex gap-2 items-center p-2">

                                                    <AvatarGroup isBordered>
                                                        <Avatar className="flex-shrink-0 w-6 h-6" src={item.data.tokenImage} />
                                                        <Avatar size="sm" className="flex-shrink-0 w-6 h-6" src={item.data.chainImage} />
                                                    </AvatarGroup>

                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{item.data.name}</span>
                                                        <span className="text-default-700 text-xs">{item.data.chain.charAt(0).toUpperCase() + item.data.chain.slice(1)}</span>
                                                    </div>
                                                </div>
                                            ));
                                        }}
                                    >
                                        {(crypto) => (
                                            <SelectItem key={crypto.id} textValue={crypto.name}>
                                                <div className="flex gap-2 items-center p-2">
                                                    <Avatar alt={crypto.name} className="flex-shrink-0 w-6 h-6 text-tiny" src={crypto.tokenImage} />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{crypto.name}</span>
                                                        <span className="text-tiny text-default-700">{crypto.chain.charAt(0).toUpperCase() + crypto.chain.slice(1)}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                    <div className="w-fit mx-auto">
                        {loading && <>
                            <Card className="mt-5 mx-5 p-5 w-[250px] h-[100px] flex items-center justify-center">
                                Loading...
                            </Card>
                        </>}
                        {!loading && receivedQuote && <>
                            <QuoteCard quoteData={receivedQuote} />
                        </>}

                        {executionResult && <>                
                            <Card className="mt-5 mx-5 p-5 h-[100px] flex items-center justify-center">
                                {typeof executionResult === "string" ? executionResult : "Awaiting User Approval"}
                            </Card>
                        </>
                        }                
                </div>
            </div>

            <div className="flex mt-5 gap-4 m-auto w-[90%]">
                {(selectedFromWalletAddress != "Select Wallet" && selectedToWalletAddress != "Select Wallet") && !receivedQuote &&
                    <Button color="secondary" variant="ghost" auto className="mb-5 py-3 px-8 w-full" onClick={() => { getQuote() }}>
                        Get Quote
                    </Button>
                }

                {(selectedFromWalletAddress != "Select Wallet" && selectedToWalletAddress != "Select Wallet") && receivedQuote &&
                    <Button color="secondary" variant="ghost" auto className="mb-5 py-3 px-8 w-full" onClick={() => { executeCustomTransaction() }}>
                        Execute Transaction
                    </Button>
                }

                {(selectedFromWalletAddress == "Select Wallet" || selectedToWalletAddress == "Select Wallet") &&
                    <div className="mb-5 flex justify-center w-full" >
                        <DynamicWidget innerButtonComponent={<div >Connect Wallet</div>} />
                    </div>
                }
            </div>

        </Card>
    );
};

export default Trade;


// {receivedQuote && <>

//     <div className="mx-5 pt-5 flex flex-row justify-between items-center">
//         <div className="text-sm">
//             {allQuotes.length > 0 ? allQuotes.length : 0} routes found!
//         </div>
//     </div>

//     <div className="mx-5 pt-5 flex flex-row justify-between items-center">
//         <div className="text-xs">
//             Sort By
//         </div>

//         <Select
//             size="sm"
//             aria-label="Select quote type"
//             className="w-[50%] text-xs text-[gray]"
//             placeholder="Select"
//             selectedKeys={selectedQuoteOption}
//             onSelectionChange={setSelectedQuoteOption}
//         >
//             <SelectItem className="text-[gray]" key={"0"}>Lowest Fees</SelectItem>
//             <SelectItem className="text-[gray]" key={"1"}>Lowest Time</SelectItem>
//         </Select>

//     </div>

// </>}
