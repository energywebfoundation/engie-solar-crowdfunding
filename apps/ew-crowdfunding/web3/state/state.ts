import { useReducer } from 'react';
import { Web3ActionsEnum } from './actions';
import type { IWeb3State, UseWeb3State, Web3Action } from './types';

const initialState: IWeb3State = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

const reducer = (state: IWeb3State, action: Web3Action): IWeb3State => {
  switch (action.type) {
    case Web3ActionsEnum.UPDATE_STATE:
      return { ...state, ...action.payload };
    case Web3ActionsEnum.RESET_STATE:
      return {};
    default:
      return state;
  }
};

export const useWeb3State: UseWeb3State = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return {
      ...state,
      dispatch,
    };
  };
  