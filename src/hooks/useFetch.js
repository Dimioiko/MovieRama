import { useState, useEffect } from "react";

export const useFetch = (url, onSuccess) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        if (onSuccess) onSuccess(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [onSuccess, url]);

  return { data, error, loading };
};
