export const loggerMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", storeAPI.getState());
    return result;
  };
