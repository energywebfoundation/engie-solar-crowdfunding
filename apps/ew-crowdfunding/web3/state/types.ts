import { Dispatch } from 'react';
import { Web3ActionsEnum } from './actions';
import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { ethers, Signer } from 'ethers';

export interface IWeb3State {
  provider?: ethers.providers.Provider;
  providerType?: ProviderType;
  address?: string;
  chainId?: number;
  signer?: Signer;
  did?: string;
}

export type UpdateWeb3Values = Pick<IWeb3State, 'address' | 'chainId' | 'provider' | 'providerType' | 'signer' | 'did'>;

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
