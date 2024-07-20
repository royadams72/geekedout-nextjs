export const loggerMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    if (action === "comics/getComics/pending") {
      console.log("next state", storeAPI.getState().music);
      console.log("dispatching==============", action);
    }

    let result = next(action);
    return result;
  };
