export type TCoinsList = {
  symbol: string;
  name: string;
  id: string;
  image: string;
};

export type TCoinsPricesList = {
  live_price: string;
  live_volume: string;
  live_changes: string;
};

export type TCoinsTableList = Partial<TCoinsPricesList> & TCoinsList;

export type TWebSocketMarketData = {
  stream: string;
  data: {
    c: string;
    q: string;
    P: string;
  };
};

export type TWebSocketData = {
  tradeData?: TWebSocketMarketData;
  isOpen?: boolean;
  error?: Event;
};
