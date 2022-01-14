import { Dispatch } from 'react';
import { Web3ActionsEnum } from './actions';
import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { Signer } from 'ethers';

export interface IWeb3State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider?: any;
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
