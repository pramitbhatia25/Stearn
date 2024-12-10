import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Sidebar from "../components/Sidebar";
import Home from "./DashboardPages/Home";
import LayoutNavbar from "../components/LayoutNavbar";
import SwapComponent from "../components/Swap";

function Dashboard() {
    return <>
        <div className="flex h-[100dvh]">
            <Sidebar />

            <main className="flex-grow overflow-y-auto">
                <LayoutNavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/swap" element={<SwapComponent />} />
                </Routes>                
            </main>
        </div>

    </>
}

export default Dashboard;