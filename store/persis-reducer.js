/* eslint-disable no-use-before-define */
import _ from "lodash";

const isBrowser = typeof window !== "undefined";
const persisKey = "_store_";

const persisReducer = (reducer, persisConfig = {}) => (
  // eslint-disable-next-line no-use-before-define
  state,
  action = {}
) => {
  const newState = reducer(state, action);
  const { paths = [] } = persisConfig;
  isBrowser && persisState(state, newState, paths);

  return newState;
};

const persisState = (prevState, curState, paths) => {
  paths.forEach(path => {
    const prevValue = _.get(prevState, path);
    const curValue = _.get(curState, path);
    // Value had be changed, then reflash storage's value.
    if (prevValue !== curValue) {
      reflashStorageProcess(curValue, path);
    }
  });
};

const reflashStorageProcess = (curValue, path) => {
  setTimeout(() => {
    const persisedValue = JSON.parse(sessionStorage.getItem(persisKey) || "{}");
    sessionStorage.setItem(
      persisKey,
      JSON.stringify(_.set(persisedValue, path, curValue))
    );
  });
};

const getInitialState = initialState => {
  const persisedValue = isBrowser
    ? sessionStorage.getItem(persisKey) || "{}"
    : "{}";
  return _.merge(initialState, JSON.parse(persisedValue));
};

export default persisReducer;

export { getInitialState };
