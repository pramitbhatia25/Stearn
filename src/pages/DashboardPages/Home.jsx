import { Card } from "@nextui-org/react";
import {
    ResponsiveContainer,
    Area,
    ReferenceLine,
    AreaChart
} from "recharts";
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { BarChart3Icon } from "lucide-react/dist/cjs/lucide-react";
import "./index.css";

export default function Dash() {
    const data = [
        { time: "2024-01-01", volume: 1000 },
        { time: "2024-02-01", volume: 1050 },
        { time: "2024-03-01", volume: 1100 },
        { time: "2024-04-01", volume: 1200 },
        { time: "2024-05-01", volume: 1250 },
        { time: "2024-06-01", volume: 1350 },
        { time: "2024-07-01", volume: 1400 },
        { time: "2024-08-01", volume: 1500 },
        { time: "2024-09-01", volume: 1550 },
        { time: "2024-10-01", volume: 1600 },
        { time: "2024-11-01", volume: 1650 },
        { time: "2024-12-01", volume: 1700 },
        { time: "2025-01-01", volume: 1800 },
        { time: "2025-02-01", volume: 1900 },
        { time: "2025-03-01", volume: 2000 },
        { time: "2025-04-01", volume: 2100 },
        { time: "2025-05-01", volume: 2200 },
        { time: "2025-06-01", volume: 2350 },
        { time: "2025-07-01", volume: 2450 },
        { time: "2025-08-01", volume: 2600 },
        { time: "2025-09-01", volume: 2750 },
        { time: "2025-10-01", volume: 2900 },
        { time: "2025-11-01", volume: 3050 },
        { time: "2025-12-01", volume: 3200 },
        { time: "2026-01-01", volume: 3400 },
        { time: "2026-02-01", volume: 3550 },
        { time: "2026-03-01", volume: 3700 },
        { time: "2026-04-01", volume: 3900 },
        { time: "2026-05-01", volume: 4100 },
        { time: "2026-06-01", volume: 4300 },
        { time: "2026-07-01", volume: 4500 },
        { time: "2026-08-01", volume: 4750 },
        { time: "2026-09-01", volume: 5000 },
        { time: "2026-10-01", volume: 5250 },
        { time: "2026-11-01", volume: 5500 },
        { time: "2026-12-01", volume: 5750 },
        { time: "2027-01-01", volume: 6000 },
        { time: "2027-02-01", volume: 6300 },
        { time: "2027-03-01", volume: 6600 },
        { time: "2027-04-01", volume: 6900 },
        { time: "2027-05-01", volume: 7200 },
        { time: "2027-06-01", volume: 7500 },
        { time: "2027-07-01", volume: 7800 },
        { time: "2027-08-01", volume: 8100 },
        { time: "2027-09-01", volume: 8400 },
        { time: "2027-10-01", volume: 8700 },
        { time: "2027-11-01", volume: 9000 },
        { time: "2027-12-01", volume: 9300 },
        { time: "2028-01-01", volume: 9600 },
        { time: "2028-02-01", volume: 9700 },
        { time: "2028-03-01", volume: 9800 },
        { time: "2028-04-01", volume: 9850 },
        { time: "2028-05-01", volume: 9900 },
        { time: "2028-06-01", volume: 9950 },
        { time: "2028-07-01", volume: 9980 },
        { time: "2028-08-01", volume: 9990 },
        { time: "2028-09-01", volume: 9995 },
        { time: "2028-10-01", volume: 10000 },
        { time: "2028-11-01", volume: 10000 },
        { time: "2028-12-01", volume: 10000 },
    ];


    const data1 = [
        { time: "2024-01-01", volume: 0 },
        { time: "2024-02-01", volume: 300 },
        { time: "2024-03-01", volume: 600 },
        { time: "2024-04-01", volume: 900 },
        { time: "2024-05-01", volume: 1200 },
        { time: "2024-06-01", volume: 1500 },
        { time: "2024-07-01", volume: 1800 },
        { time: "2024-08-01", volume: 2100 },
        { time: "2024-09-01", volume: 2500 },
        { time: "2024-10-01", volume: 2800 },
        { time: "2024-11-01", volume: 3200 },
        { time: "2024-12-01", volume: 3500 },
    ];


    const data2 = [
        { time: "2024-01-01", volume: 0 },
        { time: "2024-02-01", volume: 30 },
        { time: "2024-03-01", volume: 65 },
        { time: "2024-04-01", volume: 78 },
        { time: "2024-05-01", volume: 92 },
        { time: "2024-06-01", volume: 150 },
        { time: "2024-07-01", volume: 180 },
        { time: "2024-08-01", volume: 210 },
        { time: "2024-09-01", volume: 250 },
        { time: "2024-10-01", volume: 280 },
        { time: "2024-11-01", volume: 320 },
        { time: "2024-12-01", volume: 750 },
        { time: "2025-01-01", volume: 1200 },
        { time: "2025-02-01", volume: 1600 },
    ];


    const isLoggedIn = useIsLoggedIn();

    return (
        <div className="p-5 bg-image-landing min-h-fit h-full dark">
            <div className="text-[15px] md:text-[25px] mb-5">Dashboard</div>


            {isLoggedIn ? (
                <div className="flex flex-col md:flex-row gap-10 ">
                    <Card className="p-5 flex-1 relative overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="shimmer-border1"></div>
                        </div>
                        <div className="absolute inset-0">
                            <div className="shimmer-border2"></div>
                        </div>
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

                    <Card className=" p-5 flex-1 relative overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="shimmer-border1"></div>
                        </div>
                        <div className="absolute inset-0">
                            <div className="shimmer-border2"></div>
                        </div>
                        <div className="text-[15px] md:text-[25px]">Transactions</div>
                        <div className="text-[30px] md:text-[25px]">400</div>
                        <ResponsiveContainer height={window.innerWidth < 768 ? 150 : 100} className="w-full">
                            <AreaChart
                                data={data1}
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

                    <Card className="p-5 flex-1 relative overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="shimmer-border1"></div>
                        </div>
                        <div className="absolute inset-0">
                            <div className="shimmer-border2"></div>
                        </div>
                        <div className="text-[15px] md:text-[25px]">Unique Wallets</div>
                        <div className="text-[30px] md:text-[25px]">25</div>
                        <ResponsiveContainer height={window.innerWidth < 768 ? 150 : 100} className="w-full">
                            <AreaChart
                                data={data2}
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
                <div className="flex flex-col md:flex-row gap-10">
                    <Card className="py-[5dvh] px-5 flex-1 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="shimmer-border1"></div>
                        </div>
                        <div className="text-center">
                            <BarChart3Icon className="w-12 h-12 mx-auto mb-4" />
                            <div className="text-[25px] md:text-[35px] mb-2">Log in to view your data</div>
                            <div className="text-[15px] md:text-[20px]">Access this dashboard by signing into your account.</div>
                        </div>
                    </Card>
                </div>
            )}

            <div className="text-[15px] md:text-[25px] my-5">Resources</div>

            <div className="flex flex-col md:flex-row gap-10 h-[100px]">
                <Card className="cursor-pointer md:hover:scale-105 p-5 flex-1 relative overflow-hidden flex justify-center items-center">
                    <div className="absolute inset-0">
                        <div className="shimmer-border1"></div>
                    </div>
                    <div className="absolute inset-0">
                        <div className="shimmer-border2"></div>
                    </div>

                    <div className="w-fit mx-auto flex flex-row gap-4">
                        <BarChart3Icon className="w-10 h-10 m-auto" />
                        <div className="">
                            <div className="text-[15px] md:text-[17px] font-bold">Documentation</div>
                            <div className="text-[10px] md:text-[15px]">Explore the documentation and build</div>
                        </div>
                    </div>
                </Card>

                <Card className="cursor-pointer md:hover:scale-105 p-5 flex-1 relative overflow-hidden flex justify-center items-center">
                    <div className="absolute inset-0">
                        <div className="shimmer-border1"></div>
                    </div>
                    <div className="absolute inset-0">
                        <div className="shimmer-border2"></div>
                    </div>

                    <div className="w-fit mx-auto flex flex-row gap-4">
                        <BarChart3Icon className="w-10 h-10 m-auto" />
                        <div className="">
                            <div className="text-[15px] md:text-[17px] font-bold">Starter Templates</div>
                            <div className="text-[10px] md:text-[15px]">Use our quick starter templates</div>
                        </div>
                    </div>
                </Card>

                <Card className="cursor-pointer md:hover:scale-105 p-5 flex-1 relative overflow-hidden flex justify-center items-center">
                    <div className="absolute inset-0">
                        <div className="shimmer-border1"></div>
                    </div>
                    <div className="absolute inset-0">
                        <div className="shimmer-border2"></div>
                    </div>

                    <div className="w-fit mx-auto flex flex-row gap-4">
                        <BarChart3Icon className="w-10 h-10 m-auto" />
                        <div className="">
                            <div className="text-[15px] md:text-[17px] font-bold">Discord Community</div>
                            <div className="text-[10px] md:text-[15px]">Get answers from the team and community</div>
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    );
}

