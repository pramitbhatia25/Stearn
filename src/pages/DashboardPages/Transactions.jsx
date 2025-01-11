import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, User, Pagination, Card } from "@nextui-org/react";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer } from "recharts";
import { BarChart3Icon } from "lucide-react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

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
      avatar: "https://i.pravatar.cc/150?img=10",
      name: "Ethereum",
      subtext: "ETH Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=11",
      name: "Binance Smart Chain",
      subtext: "BSC Network"
    },
    amount: {
      value: "0.8",
      dollarValue: "$1,280"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=12",
      text: "AnySwap"
    }
  },
  {
    id: 2,
    status: "Pending",
    send: {
      avatar: "https://i.pravatar.cc/150?img=13",
      name: "Solana",
      subtext: "SOL Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=14",
      name: "Avalanche",
      subtext: "AVAX Network"
    },
    amount: {
      value: "1.3",
      dollarValue: "$2,470"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=15",
      text: "Wormhole"
    }
  },
  {
    id: 3,
    status: "Failed",
    send: {
      avatar: "https://i.pravatar.cc/150?img=16",
      name: "Polygon",
      subtext: "MATIC Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=17",
      name: "Fantom",
      subtext: "FTM Network"
    },
    amount: {
      value: "0.6",
      dollarValue: "$900"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=18",
      text: "Multichain"
    }
  },
  {
    id: 4,
    status: "Completed",
    send: {
      avatar: "https://i.pravatar.cc/150?img=19",
      name: "Cardano",
      subtext: "ADA Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=20",
      name: "Tezos",
      subtext: "XTZ Network"
    },
    amount: {
      value: "4.2",
      dollarValue: "$3,780"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=21",
      text: "xBridge"
    }
  },
  {
    id: 5,
    status: "Pending",
    send: {
      avatar: "https://i.pravatar.cc/150?img=22",
      name: "Polkadot",
      subtext: "DOT Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=23",
      name: "Tron",
      subtext: "TRX Network"
    },
    amount: {
      value: "2.7",
      dollarValue: "$2,565"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=24",
      text: "ChainLink"
    }
  },
  {
    id: 6,
    status: "Pending",
    send: {
      avatar: "https://i.pravatar.cc/150?img=25",
      name: "Stellar",
      subtext: "XLM Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=26",
      name: "NEAR Protocol",
      subtext: "NEAR Network"
    },
    amount: {
      value: "3.1",
      dollarValue: "$4,030"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=27",
      text: "Rainbow Bridge"
    }
  },
  {
    id: 7,
    status: "Pending",
    send: {
      avatar: "https://i.pravatar.cc/150?img=28",
      name: "Cosmos",
      subtext: "ATOM Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=29",
      name: "Algorand",
      subtext: "ALGO Network"
    },
    amount: {
      value: "1.8",
      dollarValue: "$2,160"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=30",
      text: "Gravity Bridge"
    }
  },
  {
    id: 8,
    status: "Failed",
    send: {
      avatar: "https://i.pravatar.cc/150?img=31",
      name: "VeChain",
      subtext: "VET Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=32",
      name: "Hedera",
      subtext: "HBAR Network"
    },
    amount: {
      value: "2.5",
      dollarValue: "$1,750"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=33",
      text: "ZBridge"
    }
  },
  {
    id: 9,
    status: "Completed",
    send: {
      avatar: "https://i.pravatar.cc/150?img=34",
      name: "Zilliqa",
      subtext: "ZIL Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=35",
      name: "Elrond",
      subtext: "EGLD Network"
    },
    amount: {
      value: "6.0",
      dollarValue: "$6,000"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=36",
      text: "OmniBridge"
    }
  },
  {
    id: 10,
    status: "Pending",
    send: {
      avatar: "https://i.pravatar.cc/150?img=37",
      name: "Harmony",
      subtext: "ONE Network"
    },
    receive: {
      avatar: "https://i.pravatar.cc/150?img=38",
      name: "EOS",
      subtext: "EOS Network"
    },
    amount: {
      value: "5.4",
      dollarValue: "$4,590"
    },
    bridge: {
      avatar: "https://i.pravatar.cc/150?img=39",
      text: "BridgeX"
    }
  }
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
            avatarProps={{ radius: "lg", src: transaction.send.avatar }}
            description={transaction.send.subtext}
            name={transaction.send.name}
          >
            {transaction.send.subtext}
          </User>
        );
      case "receive":
        return (
          <User
            avatarProps={{ radius: "lg", src: transaction.receive.avatar }}
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
            avatarProps={{ radius: "lg", src: transaction.bridge.avatar }}
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
  const rowsPerPage = (window.innerWidth < 640) ? 6 : 10;

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
    const isLoggedIn = useIsLoggedIn();

  return (

    <div className="p-5 bg-image-landing min-h-fit h-full dark ">
    <div className="text-[15px] md:text-[25px] mb-5">Transactions</div>

      {!isLoggedIn ? (
      <>
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
</>
    ) : (

      <Card className="p-5 flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="shimmer-border1"></div>
        </div>
        <div className="absolute inset-0">
          <div className="shimmer-border2"></div>
        </div>
        <Table
          isStriped
          removeWrapper
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
      </Card>

          )}
    </div>
  );
}
