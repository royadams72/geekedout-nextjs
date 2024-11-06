import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const useConvertCurr = (amount: number) => {
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (amount === null) {
      setConvertedAmount(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/exchange-rate/convert/${amount}`
        );
        const data = await response.json();
        setConvertedAmount(data.conversion_result);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConvertedAmount(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [amount]);

  return { convertedAmount, loading };
};
