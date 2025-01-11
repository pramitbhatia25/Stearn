import React, { useEffect, useState } from "react";
import SwingSDK from '@swing.xyz/sdk';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link, Textarea } from "@nextui-org/react";
import "./index.css"

export default function Transactions2() {
  const [value, setValue] = React.useState("");
  const [transactions, setTransactions] = React.useState([]);
  const [gptResponse, setGPTResponse] = React.useState("");

  async function processRawString(rawString) {

    const swapQuery = {
      fromChain: "arbitrum",
      tokenSymbol: "ETH",
      fromTokenAddress: "0x0000000000000000000000000000000000000000",
      fromUserAddress: "0x0f86DB4C951b009281011d502aad33677948DA41",
      toChain: "arbitrum",
      toTokenSymbol: "USDC",
      toTokenAddress: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      toUserAddress: "0x0f86DB4C951b009281011d502aad33677948DA41",
      tokenAmount: "5000000000000000000", // 1 ETH
    };
    console.log("LLM processed query:", swapQuery);
    return swapQuery;
  }

  async function createScheduledTransaction() {

    setGPTResponse("Loading...")

    if (!value.trim()) {
      setGPTResponse("Description cannot be empty")
      return;
    }

    try {
      const swapQuery = await processRawString(value);

      const quote = await fetchQuote(swapQuery);

      const newTransaction = {
        id: Date.now(),
        description: value,
        query: swapQuery,
        quote: quote,
      };

      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      setGPTResponse("Created Transaction!")
      setValue("");
    } catch (error) {
      setGPTResponse(`Failed to create scheduled transaction. Please try again.\n${error}`);
    }
  }

  async function getTransactions2() {
    const url1 = 'https://stoplight.io/mocks/swing/swing-platform-api/134372359/projects/testing/transactions';
    const url = 'https://platform.swing.xyz/api/v1/projects/testing-pramit/transactions'
    /*https://platform.swing.xyz/api/v1/projects/testing-pramit/quote?fromChain=arbitrum&tokenSymbol=ETH&fromTokenAddress=0x0000000000000000000000000000000000000000&fromUserAddress=0x0f86DB4C951b009281011d502aad33677948DA41&toChain=arbitrum&toTokenSymbol=USDC&toTokenAddress=0xaf88d065e77c8cc2239327c5edb3a432268e5831&toUserAddress=0x0f86DB4C951b009281011d502aad33677948DA41&tokenAmount=1000000000000000000*/

    const options = {
      method: 'GET',
      headers: { 'x-swing-environment': 'production', Accept: 'application/json', "authorization": 'swing-5807a47a-bcb4-45a5-8aea-5a69560c9e8a' }
    };

    try {
      console.log("HELL YEAH")
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("HELL YEAH")
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  function removeTransaction(id) {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  }


  async function fetchQuote(query) {
    const baseURL = "https://platform.swing.xyz/api/v1/projects/testing-pramit/quote";
    const urlParams = new URLSearchParams(query).toString();
    const url = `${baseURL}?${urlParams}`;

    const options = {
      method: "GET",
      headers: {
        "x-swing-environment": "production",
        Accept: "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Fetched quote data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching quote:", error);
      throw new Error("Failed to fetch quote.");
    }
  }


  // useEffect(() => {
  //   getTransactions2("bc1qjmkshgkfjetrqjt3z88mha2aws5jjd4cp4shek")
  // }, [])

  return (
    <div className="m-5">
      <div className="text-[15px] md:text-[25px] mb-5">Transactions</div>

      <div className="w-full">
        <Textarea
          isClearable
          className=" h-fit"
          label="Description"
          placeholder="Description"
          variant="bordered"
          value={value}
          onValueChange={setValue}
          onClear={() => console.log("textarea cleared")}
        />

        <Button
          className="my-5 block"
          color="secondary"
          onClick={createScheduledTransaction}
        >
          Create Scheduled Transaction
        </Button>

        {gptResponse}
      </div>

      {transactions.map((transaction) => (
        <Card className="my-5 p-5 w-full"
          key={transaction.id}
        >
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">{transaction.description}</p>
              <p className="text-small text-default-500">{new Date(transaction.id).toLocaleString()}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>

            <div className="flex flex-row justify-between items-start">

              <div>
                <h3>Transaction Quote</h3>
                <br />
                <div>
                  <p><strong>Integration:</strong> {JSON.stringify(transaction.quote.routes[0].quote.integration)}</p>
                  <p><strong>Swap Type:</strong> {JSON.stringify(transaction.quote.routes[0].quote.type)}</p>
                  <p><strong>Bridge Fee:</strong> {JSON.stringify(transaction.quote.routes[0].quote.bridgeFee)}</p>
                  <p><strong>Amount:</strong> {JSON.stringify(transaction.quote.routes[0].quote.amount)}</p>
                  <p><strong>Amount (USD):</strong> {JSON.stringify(transaction.quote.routes[0].quote.amountUSD)}</p>
                  <p><strong>Bridge Fee USD:</strong> {JSON.stringify(transaction.quote.routes[0].quote.bridgeFeeUSD)}</p>
                  <p><strong>Price Impact:</strong> {JSON.stringify(transaction.quote.routes[0].quote.priceImpact)}</p>
                </div>
              </div>

              <div>
                <h3>Fees:</h3>
                <br />
                <ul>
                  {transaction.quote.routes[0].quote.fees.map((fee, index) => (
                    <li key={index}>
                      <p><strong>Type:</strong> {JSON.stringify(fee.type)}</p>
                      <p><strong>Amount:</strong> {JSON.stringify(fee.amount)}</p>
                      <p><strong>Amount (USD):</strong> {JSON.stringify(fee.amountUSD)}</p>
                      <p><strong>Chain:</strong> {JSON.stringify(fee.chainSlug)}</p>
                      <p><strong>Token Symbol:</strong> {JSON.stringify(fee.tokenSymbol)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <Chip
                onClose={() => removeTransaction(transaction.id)}
                className="text-white"
              >
                Remove Transaction
              </Chip>
            </div>

          </CardBody>

        </Card>

      ))}
    </div>
  );
}
