import { useState, useEffect, StrictMode } from "react";
import axios from "axios";

type TUseAxiosConfig = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, string>;
  data?: {
    [key: string]: string | number;
  };
  headers?: {
    [key: string]: string;
  };
};

const useAxios = (config: TUseAxiosConfig) => {
  const { url, method = "GET", params = {}, data = {}, headers = {} } = config;

  const [responseData, setResponseData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    [key: string]: any;
  }>();

  const makeRequest = async () => {
    setIsLoading(true);
    setError({});

    try {
      const response = await axios({
        url,
        method,
        params,
        data,
        headers,
      });

      setResponseData(response.data);
    } catch (err) {
      setError(
        err as {
          [key: string]: any;
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return { responseData, loading: isLoading, error, makeRequest };
};

export default useAxios;
