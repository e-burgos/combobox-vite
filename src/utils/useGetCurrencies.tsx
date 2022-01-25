import { useEffect, useState } from 'react';

function useGetCurrencies(url: string) {
  const [fetchData, setFetchData] = useState<string[] | undefined>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCurrencies();
  }, [fetchData]);

  const getAllCurrencies = () => {
    fetch(url)
      .then((response) => {
        if (response) return response.json();
        throw response;
      })
      .then((data) => {
        setFetchData(data.data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { fetchData, loading, error };
}

export { useGetCurrencies };
