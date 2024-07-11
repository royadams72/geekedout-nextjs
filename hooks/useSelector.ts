import { useEffect, useState } from "react";

import { useAppDispatch } from "./store.hooks";

export const useSelectorEffect = (slice: any, dispatchAction: any) => {
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (slice === undefined) {
      console.log("dispatchAction");
      dispatch(dispatchAction());
    }

    setIsClient(true);
  }, []);

  return isClient;
};
