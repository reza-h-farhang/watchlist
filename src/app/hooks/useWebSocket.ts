import { useEffect, useState } from "react";
import { TWebSocketMarketData } from "../types/services/market";

const useWebSocket = (symbol: string) => {
  const [tradeData, setTradeData] = useState<TWebSocketMarketData>();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<Event>();

  useEffect(() => {
    if (symbol) {
      const socketUrl = `wss://stream.binance.com:443/stream?streams=${symbol}`;

      const socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        setIsOpen(true);
        console.log(`WebSocket connection established for ${symbol}`);
      };

      socket.onmessage = (event) => {
        if (socket.OPEN) setIsOpen(true);
        const message = JSON.parse(event.data);
        setTradeData(message);
      };

      socket.onerror = (_error) => {
        setError(_error);
        console.error("WebSocket Error:", _error);
      };

      socket.onclose = () => {
        setIsOpen(false);
        console.log("WebSocket connection closed");
      };

      return () => {
        socket.close();
      };
    }
  }, [symbol]);

  return { tradeData, isOpen, error };
};

export default useWebSocket;
