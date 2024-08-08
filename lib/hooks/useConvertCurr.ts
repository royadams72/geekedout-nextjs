import { useEffect, useState } from "react";

export const useConvertCurr = (amount: number) => {
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (amount === null) {
      setConvertedAmount(null);
      setLoading(false); // No conversion to be done
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/exchange-rate/convert/${amount}`
        );
        const data = await response.json();
        setConvertedAmount(data.conversion_result);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConvertedAmount(null); // Handle error, set to null
      } finally {
        setLoading(false);
      }
    })();
  }, [amount]);

  return { convertedAmount, loading };
};
