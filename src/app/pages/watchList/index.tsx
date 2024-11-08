import { useCallback, useEffect, useState } from "react";
import PlusIcon from "../../components/icons/PlusIcon";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import EmptyList from "../../components/ui/table/emptyList";
import SearchIcon from "../../components/icons/SearchIcon";
import Table from "../../components/ui/table";
import useWebSocket from "../../hooks/useWebSocket";
import CryptoModal from "../../components/pages/watchList/CryptoModal";
import {
  TCoinsList,
  TCoinsTableList,
  TWebSocketData,
} from "../../types/services/market";
import useAxios from "../../hooks/useAxios";
import { omittedTokens } from "../../constants/tokenOmits";

const DashboardWatchList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [watchListTokens, setWatchListTokens] = useState<TCoinsList[]>([]);
  const [tokens, setTokens] = useState<TCoinsTableList[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { responseData, loading } = useAxios({
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    headers: {
      "x-cg-demo-api-key": "CG-gUaiRKwjyRJc3Ekd6Xrx5tPZ",
    },
    method: "GET",
  });

  const getSocketSymbol = useCallback(() => {
    if (watchListTokens && watchListTokens.length) {
      let symbol = "";
      watchListTokens.forEach((item) => {
        if (symbol.length) symbol += "/";
        symbol += item.symbol + "usdt@ticker";
      });
      return symbol;
    }
    return "";
  }, [watchListTokens]);

  const { tradeData, isOpen, error }: TWebSocketData = useWebSocket(
    getSocketSymbol()
  );

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  useEffect(() => {
    setTokens([...watchListTokens]);
  }, [watchListTokens]);

  useEffect(() => {
    setTokens(dataFormatHandler());
  }, [tradeData]);

  const dataFormatHandler = () => {
    const temp = [...tokens];
    return temp.map((item) => {
      return tradeData?.stream.includes(item.symbol)
        ? {
            ...item,
            live_price: tradeData.data.c,
            live_changes: tradeData.data.P,
            live_volume: tradeData.data.q,
          }
        : item;
    });
  };

  const columns = [
    {
      id: "pairs",
      title: "Pairs",
      sorting: true,
      cols: 5,
    },
    {
      id: "live_price",
      title: "Price",
      sorting: true,
      cols: 3,
    },
    {
      id: "live_changes",
      title: "24h Changes",
      sorting: true,
      cols: 4,
    },
    {
      id: "live_volume",
      title: "24h Volume",
      sorting: true,
      cols: 5,
    },
  ];

  return (
    <>
      <div className="md:p-4 lg:px-8 md:block flex flex-col justify-start items-start ">
        <div className="md:border border-u-border-s md:rounded-xl bg-white h-full max-h-full w-full ">
          <div className="md:border-b border-u-border-s py-5 px-4 md:px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0">
            <div className="flex flex-col justify-start items-start gap-0.5 w-full md:w-auto">
              <div className="flex justify-start items-center gap-2">
                <h2 className="text-lg font-semibold text-u-text-p-900">
                  Watch List
                </h2>
                {tokens.length ? (
                  <span className="bg-u-purple-50 border border-u-purple-200 text-u-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {tokens.length} pairs
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-u-text-t-600">
                Keep track of your favorite crypto pairs.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-end items-center gap-4 w-full md:w-auto">
              <Input
                name="search"
                value={searchTerm}
                onChange={(_value) => setSearchTerm(_value)}
                type="text"
                placeholder="Search in watchlist"
                wrapperClassName="w-full md:w-auto"
                preIcon={<SearchIcon className="size-5" />}
              />
              <Button
                variant="filled_primary"
                size="lg"
                className="w-full md:w-auto"
                onClick={() => setModalOpen(true)}
              >
                <PlusIcon />
                Add Pairs
              </Button>
            </div>
          </div>
          <div className="overflow-auto">
            {dataFormatHandler().length ? (
              <Table
                columns={columns}
                data={
                  dataFormatHandler().filter(
                    (item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.symbol
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  ) || []
                }
              />
            ) : (
              <EmptyList onClick={() => setModalOpen(true)} />
            )}
          </div>
        </div>
      </div>

      <CryptoModal
        open={modalOpen}
        onChange={(open: boolean) => setModalOpen(open)}
        data={((responseData as TCoinsList[]) || []).filter(
          (item) => !omittedTokens.includes(item.symbol)
        )}
        isLoading={loading}
        onListChange={(list) => setWatchListTokens(list)}
        activeList={watchListTokens}
        isReady={(tradeData?.stream && isOpen) || !tradeData?.stream}
      />
    </>
  );
};

export default DashboardWatchList;
