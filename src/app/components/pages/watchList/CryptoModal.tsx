import { useEffect, useState } from "react";
import Input from "../../ui/input";
import Modal from "../../ui/modal";
import SearchIcon from "../../icons/SearchIcon";
import Checkbox from "../../ui/checkbox";
import { Rings } from "react-loader-spinner";
import Button from "../../ui/button";
import { TCoinsList } from "../../../types/services/market";
import toast from "react-hot-toast";

type TCryptoModal = {
  open: boolean;
  onChange: (open: boolean) => void;
  data: TCoinsList[];
  activeList: TCoinsList[];
  onListChange: (item: TCoinsList[]) => void;
  isReady: boolean;
  isLoading: boolean;
};

const CryptoModal = ({
  open,
  onChange,
  data,
  onListChange,
  activeList,
  isLoading,
  isReady,
}: TCryptoModal) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<TCoinsList[]>([]);
  const [sortedItems, setSortedItems] = useState<TCoinsList[]>([]);

  const selectionHandler = (item: TCoinsList) => {
    const temp = [...selectedItems];
    if (selectedItems.some((token) => token.id === item.id)) {
      const itemIndex = selectedItems.findIndex(
        (token) => token.id === item.id
      );
      temp.splice(itemIndex, 1);
    } else {
      temp.push(item);
    }
    setSelectedItems(temp);
  };

  useEffect(() => {
    if (isReady) setIsSubmitting(false);
  }, [isReady]);

  useEffect(() => {
    if (!isSubmitting) onChange(false);
  }, [isSubmitting]);

  useEffect(() => {
    if (activeList.length && open) setSelectedItems(activeList);
  }, [activeList, open]);

  useEffect(() => {
    if (data.length) {
      let temp = [...data];
      if (selectedItems.length)
        temp.sort((a, b) =>
          selectedItems.some((item) => item.id === b.id)
            ? 1
            : selectedItems.some((item) => item.id === a.id)
            ? -1
            : 1
        );
      setSortedItems(temp);
    }
  }, [data, selectedItems]);

  return (
    <Modal open={open} onChange={onChange} title="Cryptocurrencies list">
      <Input
        name="search"
        value={searchTerm}
        onChange={(_value) => setSearchTerm(_value)}
        type="text"
        placeholder="Search in watchlist"
        preIcon={<SearchIcon className="size-5" />}
      />
      {isLoading ? (
        <Rings
          visible={true}
          height="80"
          width="80"
          color="#7F56D9"
          ariaLabel="rings-loading"
          wrapperClass="justify-center items-center h-40"
        />
      ) : data && data.length ? (
        <ul className="mt-2 max-h-96 overflow-auto px-1">
          {sortedItems
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center gap-2 py-3"
              >
                <div className="flex justify-start items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-9 mt-0.5 rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-u-text-p-900 text-sm font-medium">
                      {item.symbol.toUpperCase()}
                    </p>
                    <p className="text-sm text-u-text-t-600 capitalize">
                      {item.id.replaceAll("-", " ")}
                    </p>
                  </div>
                </div>
                <Checkbox
                  checked={selectedItems.some((_item) => _item.id === item.id)}
                  onClick={() => selectionHandler(item)}
                />
              </li>
            ))}
        </ul>
      ) : null}
      <Button
        variant="filled_primary"
        size="lg"
        className={`w-full mt-4 ${isReady ? "" : "cursor-default"}`}
        onClick={() => {
          if (isReady) {
            if (selectedItems.length < 3) {
              toast.error(
                "Please select at least 3 cryptocurrency pairs to proceed."
              );
            } else {
              onListChange(selectedItems);
              toast.success("Successfully added to watchlist.");
            }
            setIsSubmitting(true);
          }
        }}
      >
        {isReady ? (
          "Submit"
        ) : (
          <Rings
            visible={true}
            height="24"
            width="24"
            color="#ffffff"
            ariaLabel="rings-loading"
            wrapperClass="justify-center items-center [&_*]:!fill-u-purple-400"
          />
        )}
      </Button>
    </Modal>
  );
};

export default CryptoModal;
