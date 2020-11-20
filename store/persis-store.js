import React from "react";
import { getInitialState } from "./persis-reducer";

const persisStore = Store => ({ children, reducer, initialState }) => {
  const initialStateWithPersisValue = getInitialState(initialState);

  return (
    <Store reducer={reducer} initialState={initialStateWithPersisValue}>
      {children}
    </Store>
  );
};

export default persisStore;
