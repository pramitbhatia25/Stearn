import { ethers } from "ethers";
import axios from "axios";

async function getSigner() {
  const provider = await new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
}


async function sendSwingApiRequest(fromChain, fromTokenSymbol, fromTokenAddress, fromUserAddress, fromTokenDecimal, toChain, toTokenSymbol, toTokenAddress, toUserAddress, tokenAmount, receivedQuote) {
    const url = "https://platform.swing.xyz/api/v1/projects/testing-pramit/send";

    const payload = {
      fromUserAddress: fromUserAddress,
      toUserAddress: toUserAddress,
      tokenSymbol: fromTokenSymbol,
      fromTokenAddress: fromTokenAddress,
      fromChain: fromChain,
      toTokenSymbol: toTokenSymbol,
      toTokenAddress: toTokenAddress,
      toChain: toChain,
      tokenAmount: tokenAmount,
      toTokenAmount: receivedQuote.quote.amount,
      route: receivedQuote.route,
      projectId: "testing-pramit",
      type: "swap",
      integration: receivedQuote.quote.integration,
    };

    
    // const payload = {
    //   fromUserAddress: "0x0f86DB4C951b009281011d502aad33677948DA41",
    //   toUserAddress: "0x0f86DB4C951b009281011d502aad33677948DA41",
    //   tokenSymbol: "ETH",
    //   fromTokenAddress: "0x0000000000000000000000000000000000000000",
    //   fromChain: "ethereum",
    //   toTokenSymbol: "WBTC",
    //   toTokenAddress: "0x03c7054bcb39f7b2e5b2c7acb37583e32d70cfa3",
    //   toChain: "bob",
    //   tokenAmount: "1500000000000000",
    //   toTokenAmount: "2278",
    //   route: [
    //     {
    //       bridge: "orbiter",
    //       bridgeTokenAddress: "0x0000000000000000000000000000000000000000",
    //       steps: ["allowance", "approve", "send"],
    //       name: "ETH",
    //       part: 100,
    //     },
    //   ],
    //   projectId: "testing-pramit",
    //   type: "swap",
    //   integration: "orbiter",
    // };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    
      if (!response.ok) {
        const errorData = await response.json(); // Parse the response body
        if (errorData?.error === "INSUFFICIENT_FUNDS") {
          console.error("Error: Insufficient funds. Message:", errorData.message);
          return errorData.message;
        } else if (
          errorData?.statusCode === 400 &&
          errorData?.message?.includes("Hop: Insufficient funds for gas")
        ) {
          console.error("Error: Gas insufficiency detected. Message:", errorData.message);
          return "Hop: Insufficient funds for gas * price + value";
        }
            throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log("Response from API:", data);

      const signer = await getSigner();
      
      console.log("got signer")

      let modifiedTx = {
        data: data.tx.data,
        from: data.tx.from,
        to: data.tx.to,
        value: data.tx.value,
        gasLimit: data.tx.gas
      };
      
      const txResponse = await signer.sendTransaction(modifiedTx);

      console.log("sent transacton")
      
      const receipt = await txResponse.wait();

      console.log('Transaction receipt:', receipt);

      console.log(txResponse.txHash)

      return txResponse.txHash; 
    } catch (error) {
      console.error("Error sending request:", error);

      if (error.message && error.message.toLowerCase().includes("user rejected transaction")) {
        return "User Rejected Transaction!";
      }
    
      return "Failed!";
    }
  }
      

const executeSwingTransaction = async (fromChain, fromTokenSymbol, fromTokenAddress, fromUserAddress, fromTokenDecimal, toChain, toTokenSymbol, toTokenAddress, toUserAddress, tokenAmount, receivedQuote) => {
    console.log(fromChain, fromTokenSymbol, fromTokenAddress, fromUserAddress, fromTokenDecimal, toChain, toTokenSymbol, toTokenAddress, toUserAddress, tokenAmount, receivedQuote)
    return await sendSwingApiRequest(fromChain, fromTokenSymbol, fromTokenAddress, fromUserAddress, fromTokenDecimal, toChain, toTokenSymbol, toTokenAddress, toUserAddress, tokenAmount, receivedQuote)
}

export default executeSwingTransaction;
