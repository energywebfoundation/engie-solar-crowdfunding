import { Web3Provider } from '@ethersproject/providers';
import { Dispatch } from 'react';
import { Web3ActionsEnum } from './actions';

export interface IWeb3State {
  provider?: any;
  web3Provider?: Web3Provider;
  address?: string;
  chainId?: number;
}

export type UpdateWeb3Values = Pick<IWeb3State, 'address' | 'chainId' | 'provider'>;

export type Web3Action =
  | {
      type: Web3ActionsEnum.UPDATE_STATE;
      payload: Partial<IWeb3State>;
    }
  | {
      type: Web3ActionsEnum.RESET_STATE;
    };

export type UseWeb3State = () => IWeb3State & {
  dispatch: Dispatch<Web3Action>;
};
