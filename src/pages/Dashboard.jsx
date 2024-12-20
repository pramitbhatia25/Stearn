import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LayoutNavbar from "../components/LayoutNavbar";
import { useState } from "react";
import Transactions from "./DashboardPages/Transactions";
import Dash from "./DashboardPages/Home";
import Fees from "./DashboardPages/Fees";
import Affiliate from "../components/Affiliates";
import SwapComponent from "./DashboardPages/Swap";
import StakeComponent from "./DashboardPages/Stake";
import WithdrawComponent from "./DashboardPages/Withdraw";

function Dashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    return (
        <div className="flex w-full h-[100dvh] overflow-hidden">
            <div
                className={`flex flex-col h-[100dvh] overflow-y-auto transition-all duration-300 border-r border-gray-800 flex-shrink-0 ${
                    isSidebarCollapsed
                        ? 'w-[100px] md:w-[80px]'
                        : 'w-[100dvw] md:w-[15dvw] md:min-w-[150px]'
                }`}
            >
                <Sidebar 
                    collapsed={isSidebarCollapsed} 
                    setIsSidebarCollapsed={setIsSidebarCollapsed}
                    onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </div>

            <main className={`flex-1 overflow-y-auto overflow-x-hidden scroll-auto ${
                isSidebarCollapsed
                    ? 'w-[calc(100dvw-100px)] md:w-[calc(100dvw-100px)]'
                    : 'w-[calc(100dvw-100dvw)] md:w-[calc(100dvw-15dvw)]'
            }`}>
                <LayoutNavbar />
                <Routes>
                    <Route path="/" element={<Dash />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/swap" element={<SwapComponent />} />
                    <Route path="/stake" element={<StakeComponent />} />
                    <Route path="/withdraw" element={<WithdrawComponent />} />                    
                    <Route path="/fees" element={<Fees />} />
                    <Route path="/affiliate" element={<Affiliate />} />
                </Routes>
            </main>
        </div>
    );
}

export default Dashboard;