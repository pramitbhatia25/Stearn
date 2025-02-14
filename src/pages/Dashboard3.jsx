import { useState } from "react";
import CustomNavbar from "../components/Navbar";
import Charts from "./NewDashboardPages/Charts";
import News from "./NewDashboardPages/News";
import { AdvancedRealTimeChart, TechnicalAnalysis } from "react-ts-tradingview-widgets";
import NewCharts from "./NewDashboardPages/RowCharts";
import Chat from "./NewDashboardPages/Chat";
import { Divider } from "@nextui-org/react";
import Dash3Left from "./Dashboard3Pages/Dash3Left";
import Dash3Right from "./Dashboard3Pages/Dash3Right";
import Dash3Chat from "./Dashboard3Pages/Dash3Chat"

function Dashboard3() {

  const coins = ["SOLUSD", "BTCUSD", "ETHUSD", "BNBUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT", "DOTUSDT", "USDC.D", "USDT.D", "LINKUSD", "TRXUSD.P", "AVAXUSDT", "SHIBUSDT", "TONUSDT", "LTCUSDT.P", "HBARUSDT", "DOTUSDT", "HYPEUSD"];
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const coinMap = Object.fromEntries(coins.map((coin, index) => [index + 1, coin]));

  function getCoinName(id) {
    return coinMap[id] || "GOOG";
  }

  return <div className='bg-image-landing sm:h-fit md:h-[100dvh] min-h-[100dvh] w-[100dvw]'>
    <div className=" fixed w-full top-0 z-[200]">
      <CustomNavbar widget={true} />
    </div>

    <div className="pt-[14dvh] h-full">
      <div className="sm:min-h-[86dvh] md:h-[86dvh] w-full bg-white grid md:grid-cols-12 sm:grid-cols-1 md:grid-rows-1 sm:grid-rows-3 text-black">
        <div className="md:border-r md:border-black-100 col-span-3 row-span-1 overflow-y-auto overflow-x-hidden">
          <Dash3Left coin={"BTC"}/>
        </div>
        <div className="md:border-r md:border-black-100 col-span-6 row-span-1">
          <Dash3Chat coin={"BTCUSD"} />
        </div>
        <div className="col-span-3 row-span-1">
          <Dash3Right coin={"BTC"}/>
        </div>
      </div>
    </div>
  </div>
}
export default Dashboard3;
