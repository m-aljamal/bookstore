import React from "react";

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

type AsyncState<DataType> =
  | {
      status: "idle" | "pending";
      data: null;
      error: null;
    }
  | {
      status: "resolved";
      data: DataType;
      error: null;
    }
  | {
      status: "rejected";
      data: null;
      error: Error;
    };

type AsyncAction<DataType> =
  | {
      type: "pending";
    }
  | { type: "resolved"; data: DataType }
  | { type: "rejected"; error: Error };

function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>
) {
  switch (action.type) {
    case "pending": {
      return { status: "pending" as const, data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved" as const, data: action.data, error: null };
    }
    case "rejected": {
      return { status: "rejected" as const, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
}

function useAsync<DataType>(initialState?: AsyncState<DataType>) {
  const [state, unsafeDispatch] = React.useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = React.useCallback(
    (promise: Promise<DataType>) => {
      dispatch({ type: "pending" });
      promise.then(
        (data: DataType) => {
          dispatch({ type: "resolved", data });
        },
        (error: Error) => {
          dispatch({ type: "rejected", error });
        }
      );
    },
    [dispatch]
  );

  const setData = React.useCallback(
    (data: DataType) => dispatch({ type: "resolved", data }),
    [dispatch]
  );

  const setError = React.useCallback(
    (error: Error) => dispatch({ type: "rejected", error }),
    [dispatch]
  );

  return {
    setData,
    setError,
    data,
    error,
    status,
    run,
  };
}

export default useAsync;
