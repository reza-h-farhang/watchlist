import EmptyListImage from "../../../../assets/svg/empty_list_ill.svg";
import PlusIcon from "../../icons/PlusIcon";
import Button from "../button";

type TEmptyList = {
  onClick: () => void;
};

const EmptyList = ({ onClick }: TEmptyList) => {
  return (
    <div className="pt-10 pb-12 px-8 ">
      <div className="w-full max-w-[472px] mx-auto">
        <div className="bg-[url(./assets/svg/empty_list_bg_pattern.svg)] pt-[100%] bg-center relative -top-3">
          <div className="absolute left-1/2 top-24 -translate-x-1/2 flex flex-col justify-start items-center gap-4 text-center w-full">
            <img
              src={EmptyListImage}
              alt=""
              aria-hidden
              className="w-[150px] h-[150px] object-contain "
            />
            <h3 className="text-u-text-p-900 text-lg font-semibold max-w-[360px] mb-2">
              You need at least 3 Crypto Pairs to view your watchlist
            </h3>
            <Button variant="filled_primary" size="lg" onClick={onClick}>
              <PlusIcon />
              Add Pairs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
