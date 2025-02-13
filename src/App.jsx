import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./app.css";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import Dashboard3 from "./pages/Dashboard3";
import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import { AlgorandWalletConnectors } from "@dynamic-labs/algorand";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { CosmosWalletConnectors } from "@dynamic-labs/cosmos";
import { EclipseWalletConnectors } from "@dynamic-labs/eclipse";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import MainSwapComponent from "./pages/MainSwap";


function App() {

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "b729ee28-b174-4641-8419-f946ccc04243",
        walletConnectors: [
          AlgorandWalletConnectors,
          BitcoinWalletConnectors,
          CosmosWalletConnectors,
          EclipseWalletConnectors,
          EthereumWalletConnectors,
          FlowWalletConnectors,
          SolanaWalletConnectors,
          StarknetWalletConnectors,
        ],
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/research" element={<Dashboard2 />}></Route>
          <Route path="/research3/BTC" element={<Dashboard3 />}></Route>
          <Route path="/trade" element={<MainSwapComponent />}></Route>
          <Route path="/dashboard/*" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </DynamicContextProvider>
  );
}

export default App;
