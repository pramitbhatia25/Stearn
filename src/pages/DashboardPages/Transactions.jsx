import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, User, Pagination } from "@nextui-org/react";
import SwingSDK from '@swing.xyz/sdk';

const statusColorMap = {
  Completed: "success",
  Pending: "warning",
  Failed: "danger",
};

const columns = [
  { name: "STATUS", uid: "status" },
  { name: "SEND", uid: "send" },
  { name: "RECEIVE", uid: "receive" },
  { name: "AMOUNT", uid: "amount" },
  { name: "BRIDGE", uid: "bridge" },
];

const transactions = [
    {
      id: 1,
      status: "Completed",
      send: {
        avatar: "https://i.pravatar.cc/150?img=3", // Updated avatar
        name: "Ethereum",
        subtext: "ETH Network"
      },
      receive: {
        avatar: "https://i.pravatar.cc/150?img=5", // Updated avatar
        name: "Binance Smart Chain",
        subtext: "BSC Network"
      },
      amount: {
        value: "1.5",
        dollarValue: "$2,100"
      },
      bridge: {
        avatar: "https://i.pravatar.cc/150?img=7", // Updated avatar
        text: "AnySwap"
      }
    },
    {
      id: 2,
      status: "Pending",
      send: {
        avatar: "https://i.pravatar.cc/150?img=9", // Updated avatar
        name: "Solana",
        subtext: "SOL Network"
      },
      receive: {
        avatar: "https://i.pravatar.cc/150?img=12", // Updated avatar
        name: "Avalanche",
        subtext: "AVAX Network"
      },
      amount: {
        value: "2.0",
        dollarValue: "$2,800"
      },
      bridge: {
        avatar: "https://i.pravatar.cc/150?img=15", // Updated avatar
        text: "Wormhole"
      }
    },
    {
      id: 3,
      status: "Failed",
      send: {
        avatar: "https://i.pravatar.cc/150?img=18", // Updated avatar
        name: "Polygon",
        subtext: "MATIC Network"
      },
      receive: {
        avatar: "https://i.pravatar.cc/150?img=21", // Updated avatar
        name: "Fantom",
        subtext: "FTM Network"
      },
      amount: {
        value: "0.8",
        dollarValue: "$1,120"
      },
      bridge: {
        avatar: "https://i.pravatar.cc/150?img=25", // Updated avatar
        text: "Multichain"
      }
    },
    {
      id: 4,
      status: "Completed",
      send: {
        avatar: "https://i.pravatar.cc/150?img=30", // Updated avatar
        name: "Cardano",
        subtext: "ADA Network"
      },
      receive: {
        avatar: "https://i.pravatar.cc/150?img=33", // Updated avatar
        name: "Tezos",
        subtext: "XTZ Network"
      },
      amount: {
        value: "5.0",
        dollarValue: "$4,500"
      },
      bridge: {
        avatar: "https://i.pravatar.cc/150?img=36", // Updated avatar
        text: "xBridge"
      }
    },
    {
      id: 5,
      status: "Pending",
      send: {
        avatar: "https://i.pravatar.cc/150?img=39", // Updated avatar
        name: "Polkadot",
        subtext: "DOT Network"
      },
      receive: {
        avatar: "https://i.pravatar.cc/150?img=42", // Updated avatar
        name: "Tron",
        subtext: "TRX Network"
      },
      amount: {
        value: "3.2",
        dollarValue: "$3,040"
      },
      bridge: {
        avatar: "https://i.pravatar.cc/150?img=45", // Updated avatar
        text: "ChainLink"
      }
    },
    {
        id: 6,
        status: "Pending",
        send: {
          avatar: "https://i.pravatar.cc/150?img=39", // Updated avatar
          name: "Polkadot",
          subtext: "DOT Network"
        },
        receive: {
          avatar: "https://i.pravatar.cc/150?img=42", // Updated avatar
          name: "Tron",
          subtext: "TRX Network"
        },
        amount: {
          value: "3.2",
          dollarValue: "$3,040"
        },
        bridge: {
          avatar: "https://i.pravatar.cc/150?img=45", // Updated avatar
          text: "ChainLink"
        }
      },
      {
        id: 7,
        status: "Pending",
        send: {
          avatar: "https://i.pravatar.cc/150?img=39", // Updated avatar
          name: "Polkadot",
          subtext: "DOT Network"
        },
        receive: {
          avatar: "https://i.pravatar.cc/150?img=42", // Updated avatar
          name: "Tron",
          subtext: "TRX Network"
        },
        amount: {
          value: "3.2",
          dollarValue: "$3,040"
        },
        bridge: {
          avatar: "https://i.pravatar.cc/150?img=45", // Updated avatar
          text: "ChainLink"
        }
      },
      {
        id: 8,
        status: "Pending",
        send: {
          avatar: "https://i.pravatar.cc/150?img=39", // Updated avatar
          name: "Polkadot",
          subtext: "DOT Network"
        },
        receive: {
          avatar: "https://i.pravatar.cc/150?img=42", // Updated avatar
          name: "Tron",
          subtext: "TRX Network"
        },
        amount: {
          value: "3.2",
          dollarValue: "$3,040"
        },
        bridge: {
          avatar: "https://i.pravatar.cc/150?img=45", // Updated avatar
          text: "ChainLink"
        }
      },
      {
        id: 9,
        status: "Pending",
        send: {
          avatar: "https://i.pravatar.cc/150?img=39", // Updated avatar
          name: "Polkadot",
          subtext: "DOT Network"
        },
        receive: {
          avatar: "https://i.pravatar.cc/150?img=42", // Updated avatar
          name: "Tron",
          subtext: "TRX Network"
        },
        amount: {
          value: "3.2",
          dollarValue: "$3,040"
        },
        bridge: {
          avatar: "https://i.pravatar.cc/150?img=45", // Updated avatar
          text: "ChainLink"
        }
      },
      {
        id: 10,
        status: "Pending",
        send: {
          avatar: "https://i.pravatar.cc/150?img=39", // Updated avatar
          name: "Polkadot",
          subtext: "DOT Network"
        },
        receive: {
          avatar: "https://i.pravatar.cc/150?img=42", // Updated avatar
          name: "Tron",
          subtext: "TRX Network"
        },
        amount: {
          value: "3.2",
          dollarValue: "$3,040"
        },
        bridge: {
          avatar: "https://i.pravatar.cc/150?img=45", // Updated avatar
          text: "ChainLink"
        }
      },
            ];
  
export default function Transactions() {
  const renderCell = React.useCallback((transaction, columnKey) => {
    const cellValue = transaction[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[transaction.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "send":
        return (
            <User
            avatarProps={{radius: "lg", src: transaction.send.avatar}}
            description={transaction.send.subtext}
            name={transaction.send.name}
          >
            {transaction.send.subtext}
          </User>
        );
      case "receive":
        return (
            <User
            avatarProps={{radius: "lg", src: transaction.receive.avatar}}
            description={transaction.receive.subtext}
            name={transaction.receive.name}
          >
            {transaction.receive.subtext}
          </User>
        );
      case "amount":
        return (
          <div>
            <p>{cellValue.value} BTC</p>
            <p className="text-sm text-default-400">{cellValue.dollarValue}</p>
          </div>
        );
      case "bridge":
        return (
            <User
            avatarProps={{radius: "lg", src: transaction.bridge.avatar}}
            name={transaction.bridge.text}
          >
            {transaction.bridge.text}
          </User>
        );
      default:
        return cellValue;
    }
  }, []);


  const [page, setPage] = useState(1);
  const rowsPerPage = (window.innerWidth < 640) ? 6 : 12;

  const pages = Math.ceil(transactions.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transactions.slice(start, end);
  }, [page, transactions]);

  const classNames = React.useMemo(
    () => ({
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    [],
  );

  async function getTransactions() {
    const swingSDK = new SwingSDK({
      environment: 'testnet',
      projectId: 'testing-pramit',     
    });

    await swingSDK.init();

    const transactions = await swingSDK.wallet.getTransactions();
    await swingSDK.wallet.connect(window.CoinbaseWalletProvider, 'ethereum');


    console.log("HELL YEAH")
    console.log(transactions)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div className="m-5">
    <div className="text-[15px] md:text-[25px] mb-5">Transactions</div>
    <Table 
        isStriped
        aria-label="Transaction Table"
        checkboxesProps={{
            classNames: {
              wrapper: "after:bg-foreground after:text-background text-background",
            },
          }}
        classNames={classNames}
        bottomContent={
            <div className="flex w-full justify-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
            />
            </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}
            allowsSorting={column.sortable}
            
            align={column.uid === "bridge" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} >
          {(item) => (
            <TableRow key={item.id} >
              {(columnKey) => <TableCell className="">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
