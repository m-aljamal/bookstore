import React from "react";

const defaultInitialState = {
  status: "idle",
  data: null,
  error: null,
};

const useSafeDispatch = (dispatch: any) => {
  const mountedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return React.useCallback(
    (...args: any) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch]
  );
};

const useAsync = (initialState?: any) => {
  const initailStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const [{ status, data, error }, setState] = React.useReducer(
    (s: any, a: any) => ({ ...s, ...a }),
    initailStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data: any) => safeSetState({ data, status: "success" }),
    [safeSetState]
  );

  const setError = React.useCallback(
    (error: any) => safeSetState({ error, status: "error" }),
    [safeSetState]
  );

  const reset = React.useCallback(
    () => safeSetState(initailStateRef.current),
    [safeSetState]
  );

  const run = React.useCallback(
    (promise: any) => {
      if (!promise || !promise.then) {
        throw new Error("Please pass in a promise");
      }
      safeSetState({ status: "pending" });
      return promise.then(
        (data: any) => {
          setData(data);
          return data;
        },
        (error: any) => {
          setError(error);
          return error;
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    run,
    setData,
    setError,
    error,
    status,
    data,
    reset,
  };
};

export default useAsync;
