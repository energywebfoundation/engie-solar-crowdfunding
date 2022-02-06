import { Reducer } from 'redux';
import { Web3ReducerState, Web3ActionTypes } from './types';

const initialState: Web3ReducerState = {
  isLoading: false,
  isConnectedToRightNetwork: false,
  provider: null,
  providerType: null,
  address: null,
  chainId: null,
  signer: null,
  did: null,
  publicKey: null,
  authenticated: false,
  roleEnrolmentStatus: null,
  isMetamaskPresent: false,
};

const web3Reducer: Reducer<Web3ReducerState> = (state: Web3ReducerState = initialState, { type, payload, error }) => {
  switch (type) {
    case Web3ActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case Web3ActionTypes.SET_WEB3:
      return {
        ...state,
        ...payload,
      };
    case Web3ActionTypes.RESET_WEB3:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export { web3Reducer as web3 };