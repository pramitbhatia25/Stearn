import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, User, Pagination, Card } from "@nextui-org/react";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer } from "recharts";

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
  
export default function Affiliate() {
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
  const rowsPerPage = (window.innerWidth < 640) ? 4 : 6;

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


  return (
    <div className="m-5">
    <div className="text-[15px] md:text-[25px] mb-5">Affiliate Data</div>

    <div className="flex flex-col md:flex-row gap-10 ">
    <Card className="bg-gradient-to-tr from-[#000000] to-[#010214] p-5 flex-1 relative overflow-hidden">
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

        <Card className="bg-gradient-to-tr from-[#000000] to-[#010214] p-5 flex-1 relative overflow-hidden">
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

        <Card className="bg-gradient-to-tr from-[#000000] to-[#010214] p-5 flex-1 relative overflow-hidden">
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

    <div className="text-[15px] md:text-[25px] my-5">Affiliate List</div>

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