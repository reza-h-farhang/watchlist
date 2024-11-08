import { digit, removeZeroTrailings } from "../../../helpers/numbers";
import ChevronIcon from "../../icons/ChevronIcon";
import USDTIcon from "../../../../assets/tokens/USDT.svg";
import { useCallback, useState } from "react";
import { TCoinsTableList } from "../../../types/services/market";

type TTableColumn = {
  id: string;
  title: string;
  sorting: boolean;
  cols: number;
};

type TTable = {
  columns: TTableColumn[];
  data: TCoinsTableList[];
};

const Table = ({ columns, data }: TTable) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

  const handleSort = (columnId: string) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === columnId) {
        const newDirection =
          prevSortConfig.direction === "asc"
            ? "desc"
            : prevSortConfig.direction === "desc"
            ? null
            : "asc";
        return { key: columnId, direction: newDirection };
      }
      return { key: columnId, direction: "asc" };
    });
  };

  const sortedData = useCallback(() => {
    const { key, direction } = sortConfig;
    if (key && direction) {
      return [...data].sort((a, b) => {
        const aValue = a[key as keyof TCoinsTableList];
        const bValue = b[key as keyof TCoinsTableList];
        if (typeof aValue === "number" && typeof bValue === "number") {
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === "string" && typeof bValue === "string") {
          return direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }
    return data;
  }, [sortConfig, data]);

  const getTotalColumns = (_columns: TTableColumn[]) => {
    return _columns.reduce((acc, col) => acc + col.cols, 0);
  };

  return (
    <div className="min-w-[600px]">
      <div
        className="border-b py-3 border-u-border-s bg-neutral-50 text-xs font-semibold text-u-text-ph grid"
        style={{
          gridTemplateColumns: `repeat(${getTotalColumns(columns)}, 1fr)`,
        }}
      >
        {columns.map((column) => (
          <div
            key={column.id}
            className="px-6 flex justify-start items-center gap-1 cursor-pointer"
            style={{
              gridColumn: `${column.cols} span / ${column.cols} span`,
            }}
            onClick={() =>
              column.sorting &&
              handleSort(column.id === "pairs" ? "id" : column.id)
            }
          >
            {column.title}
            {column.sorting && (
              <div className="flex flex-col justify-center items-center ">
                <ChevronIcon
                  className={`w-3 h-2 ${
                    (column.id === "pairs" && sortConfig.key === "id") ||
                    sortConfig.key === column.id
                      ? sortConfig.direction === "asc"
                        ? "[&_path]:stroke-u-fg-q-400"
                        : "[&_path]:stroke-u-border-p"
                      : "[&_path]:stroke-u-border-p"
                  }`}
                />
                <ChevronIcon
                  className={`rotate-180 w-3 h-2 ${
                    (column.id === "pairs" && sortConfig.key === "id") ||
                    sortConfig.key === column.id
                      ? sortConfig.direction === "desc"
                        ? "[&_path]:stroke-u-fg-q-400"
                        : "[&_path]:stroke-u-border-p"
                      : "[&_path]:stroke-u-border-p"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="h-[calc(100vh_-_338px)] md:h-[calc(100vh_-_274px)] lg:h-[calc(100vh_-_286px)] overflow-auto">
        {sortedData().length
          ? sortedData().map((item, index) => (
              <div
                key={`${item?.symbol}_${index}`}
                className={`text-xs font-semibold text-u-text-ph grid
            ${index < data.length - 1 ? "border-b border-u-border-s" : ""}
            `}
                style={{
                  gridTemplateColumns: `repeat(${getTotalColumns(
                    columns
                  )}, 1fr)`,
                }}
              >
                <div className="col-span-5 w-full px-6 py-4 flex justify-start items-center gap-3">
                  <div className="relative">
                    {item?.image && (
                      <img
                        src={item?.image}
                        alt={item?.symbol}
                        className="size-8 min-w-8 mt-0.5 rounded-full"
                      />
                    )}
                    <img
                      src={USDTIcon}
                      alt={"USDT"}
                      className="absolute left-4 top-4.5"
                    />
                  </div>
                  <div>
                    <p className="text-u-text-p-900 text-sm font-medium capitalize">
                      {item?.id.replaceAll("-", " ")}
                    </p>
                    <p className="text-sm text-u-text-t-600">{`${item?.symbol.toUpperCase()}/USDT`}</p>
                  </div>
                </div>
                <div className="col-span-3 w-full px-6 py-4 text-u-text-t-600 text-sm font-medium flex justify-start items-center">
                  <div className="flex justify-start items-end  gap-1">
                    {!item?.live_price || isNaN(Number(item?.live_price)) ? (
                      <>
                        <div className="animate-pulse bg-u-fg-q-400 rounded w-28 h-6"></div>
                        <div className="animate-pulse bg-u-fg-q-400 rounded w-12 h-5"></div>
                      </>
                    ) : (
                      <>
                        {removeZeroTrailings(Number(item?.live_price), 2)}
                        <span className="text-[10px]">USD</span>
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={`col-span-4 w-full px-6 py-4 flex justify-start items-center gap-1 text-xs ${
                    item?.live_changes && Number(item?.live_changes) < 0
                      ? "text-u-danger fill-u-danger"
                      : "text-u-success fill-u-success"
                  }`}
                >
                  {!item?.live_changes || isNaN(Number(item?.live_changes)) ? (
                    <>
                      <div className="animate-pulse bg-u-fg-q-400 rounded w-full max-w-28 h-6"></div>
                    </>
                  ) : (
                    <>
                      {Math.abs(Number(item?.live_changes)).toFixed(2) + "%"}
                      <ChevronIcon
                        className={
                          Number(item?.live_changes) < 0 ? "rotate-180" : ""
                        }
                      />
                    </>
                  )}
                </div>
                <div className="col-span-5 w-full px-6 py-4 text-u-text-t-600 text-sm font-medium flex justify-start items-center">
                  <div className="flex justify-start items-end  gap-1">
                    {!item?.live_volume || isNaN(Number(item?.live_volume)) ? (
                      <>
                        <div className="animate-pulse bg-u-fg-q-400 rounded w-28 h-6"></div>
                        <div className="animate-pulse bg-u-fg-q-400 rounded w-12 h-5"></div>
                      </>
                    ) : (
                      <>
                        {removeZeroTrailings(Number(item?.live_volume), 2)}
                        <span className="text-[10px]">USD</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Table;
