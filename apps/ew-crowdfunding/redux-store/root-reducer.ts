export * from './store';
import { combineReducers, Reducer } from 'redux';
import { smartContract } from './smart-contract';
import { web3 } from './web3';

const appReducer = combineReducers({
  smartContract,
  web3,
});

const rootReducer: Reducer = (state, action) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
