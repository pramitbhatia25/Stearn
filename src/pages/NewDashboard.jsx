import { useState } from "react";
import CustomNavbar from "../components/Navbar";
import Charts from "./NewDashboardPages/Charts";
import News from "./NewDashboardPages/News";
import { AdvancedRealTimeChart, TechnicalAnalysis } from "react-ts-tradingview-widgets";
import NewCharts from "./NewDashboardPages/RowCharts";
import Chat from "./NewDashboardPages/Chat";

function NewDashboard() {

  const coins = ["SOLUSD", "BTCUSD", "ETHUSD", "BNBUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT", "DOTUSDT", "USDC.D", "USDT.D", "LINKUSD", "TRXUSD.P", "AVAXUSDT", "SHIBUSDT", "TONUSDT", "LTCUSDT.P", "HBARUSDT", "DOTUSDT", "HYPEUSD"];
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const coinMap = Object.fromEntries(coins.map((coin, index) => [index + 1, coin]));

  function getCoinName(id) {
    return coinMap[id] || "GOOG";
  }


  return <div className='bg-image-landing min-h-[100dvh] h-fit w-[100dvw]'>
    <div className=" fixed w-full top-0 z-[200]">
      <CustomNavbar widget={true} />
    </div>

    <div className="fixed top-[14dvh] z-[200] h-[10dvh] w-[90dvw] md:w-[96dvw] mb-[2dvh] mx-[5dvw] md:mx-[2dvw] bg-white/20 backdrop-blur-md shadow-lg rounded-xl border border-white/10 p-4 overflow-auto scrollbar-hide">
        <NewCharts selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} />
    </div>

    <div className="pt-[26dvh] mb-[5dvh] sm:h-fit md:h-[100dvh] lg:h-[95dvh] overflow-hidden grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 w-[90dvw] md:w-[96dvw] mx-[5dvw] md:mx-[2dvw]">

      <div className="sm:col-span-1 md:col-span-1 lg:col-span-4 h-full flex flex-col justify-between gap-4">
        <div className="h-[40%] bg-white/20 backdrop-blur-md shadow-lg overflow-auto scrollbar-hide rounded-xl border border-white/10 p-4">
          <div className="h-[100%] overflow-hidden rounded-lg">
            <AdvancedRealTimeChart withdateranges={false} symbol={getCoinName([...selectedKeys][0])} hide_top_toolbar={true} hide_side_toolbar={true} theme="dark" allow_symbol_change={false} autosize></AdvancedRealTimeChart>
          </div>
        </div>
        <div className="h-[60%] bg-white/20 backdrop-blur-md shadow-lg overflow-auto scrollbar-hide rounded-xl border border-white/10 p-4">
          <div className="h-[100%] overflow-hidden rounded-lg">
            <TechnicalAnalysis interval={"1D"} showIntervalTabs={false} colorTheme="dark" symbol={getCoinName([...selectedKeys][0])} autosize></TechnicalAnalysis>
          </div>
        </div>
      </div>

      <div className="sm:col-span-1 md:col-span-1 lg:col-span-3 bg-white/20 backdrop-blur-md shadow-lg overflow-auto scrollbar-hide rounded-xl border border-white/10 p-4">
        <News />
      </div>

      <div className="sm:col-span-1 md:col-span-2 lg:col-span-5 bg-white/20 backdrop-blur-md shadow-lg overflow-auto scrollbar-hide rounded-xl border border-white/10 p-2">
        <Chat />
      </div>
    </div>

  </div>
}
export default NewDashboard;
