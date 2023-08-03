import { useEffect, useState } from 'react';
import { Library } from '../types';

export const useFetchResource = (
  url: string
): {
  data: Library[];
  loading: boolean;
  error: boolean;
} => {
  const [data, setData] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          setError(true);
          throw new Error(response.statusText || 'Something went wrong');
        }

        const { data } = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    getData();
  }, [url]);

  return { data, loading, error };
};
