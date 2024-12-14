import { Card } from "@nextui-org/react";
import {
    ResponsiveContainer,
    Area,
    ReferenceLine,
    AreaChart
} from "recharts";
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { BarChart3Icon } from "lucide-react/dist/cjs/lucide-react";

export default function Dash() {
    const data = [
        { time: "2024-01-01", volume: 2100 },
        { time: "2024-02-01", volume: 2200 },
        { time: "2024-03-01", volume: 2300 },
        { time: "2024-04-01", volume: 2400 },
        { time: "2024-05-01", volume: 2500 },
        { time: "2024-06-01", volume: 2700 },
        { time: "2024-07-01", volume: 2900 },
        { time: "2024-08-01", volume: 3100 },
        { time: "2024-09-01", volume: 3300 },
        { time: "2024-10-01", volume: 3500 },
    ];

    const isLoggedIn = useIsLoggedIn();

    return (
        <div className="m-5">
            <div className="text-[25px] md:text-[35px] mb-5">Dashboard</div>

            {isLoggedIn ? (
                <div className="flex flex-col md:flex-row gap-10 ">
                    <Card className="bg-gradient-to-tr from-[#9054d0] to-[#010214] p-5 flex-1">
                        <div className="text-[15px] md:text-[25px]">Transaction Volume</div>
                        <div className="text-[30px] md:text-[25px]">$25,000</div>
                        <ResponsiveContainer height={window.innerWidth < 768 ? 150 : 100} className="w-full">
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 20,
                                }}
                            >
                                <Area type="monotone" dataKey="volume" stroke="#8884d8" fill="#8884d8" />
                                <ReferenceLine y={0} stroke="#000" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card className="bg-gradient-to-tr from-[#9054d0] to-[#010214] p-5 flex-1">
                        <div className="text-[15px] md:text-[25px]">Transactions</div>
                        <div className="text-[30px] md:text-[25px]">400</div>
                        <ResponsiveContainer height={window.innerWidth < 768 ? 150 : 100} className="w-full">
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 20,
                                }}
                            >
                                <Area type="monotone" dataKey="volume" stroke="#8884d8" fill="#8884d8" />
                                <ReferenceLine y={0} stroke="#000" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card className="bg-gradient-to-tr from-[#9054d0] to-[#010214] p-5 flex-1">
                        <div className="text-[15px] md:text-[25px]">Unique Wallets</div>
                        <div className="text-[30px] md:text-[25px]">25</div>
                        <ResponsiveContainer height={window.innerWidth < 768 ? 150 : 100} className="w-full">
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 20,
                                }}
                            >
                                <Area type="monotone" dataKey="volume" stroke="#8884d8" fill="#8884d8" />
                                <ReferenceLine y={0} stroke="#000" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-10 ">
                    <Card className="h-[300px] bg-gradient-to-tr from-[#9054d0] to-[#010214] p-5 flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3Icon className="w-12 h-12 mx-auto text-white mb-4" />
                            <div className="text-[25px] md:text-[35px] text-white mb-2">Log in to view your data</div>
                            <div className="text-[15px] md:text-[20px] text-gray-300">Access this dashboard by signing into your account.</div>
                        </div>
                    </Card>
                </div>
            )}


        </div>
    );
}

