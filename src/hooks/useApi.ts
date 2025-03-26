import axios, { AxiosRequestHeaders } from "axios";
import { useCallback, useState } from "react";

export enum method {
  get = "get",
  post = "post",
  put = "put",
  patch = "patch",
  delete = "delete",
}

export const useApi = (baseUrl: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (
      path: string,
      method: method,
      body?: unknown,
      headers?: AxiosRequestHeaders
    ) => {
      setLoading(true);
      try {
        let res;

        if (method === "get" || method === "delete") {
          res = await axios[method](baseUrl + path, { headers });
        } else {
          res = await axios[method](baseUrl + path, body, { headers });
        }

        if (res.status < 200 || res.status >= 300) {
          throw new Error("Что-то пошло не так");
        }

        setLoading(false);
        return res;
      } catch (e) {
        setError(true);
        setLoading(false);
        console.error("Ошибка запроса:", e);
      }
    },
    [baseUrl]
  );

  return { fetchData, error, loading };
};
