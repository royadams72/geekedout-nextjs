import { useEffect, useState } from "react";

import { useAppDispatch } from "./store.hooks";

export const useSelectorEffect = (slice: Array<any>, dispatchAction: any) => {
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // async () => {
    // if (slice === undefined || slice.length === 0) {
    console.log("dispatchAction");
    dispatch(dispatchAction());
    // }
    // };

    setIsClient(true);
  }, []);

  return isClient;
};
