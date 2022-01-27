/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { Web3ActionsEnum } from './actions';
import { ProviderType } from 'iam-client-lib';
import { RoleEnrollmentStatus } from '../types';

export interface IWeb3State {
  provider?: any;
  providerType?: ProviderType;
  address?: string;
  chainId?: number;
  signer?: any;
  did?: string;
  publicKey?: string;
  authenticated?: boolean;
  role?: RoleEnrollmentStatus;
}

export type UpdateWeb3Values = Pick<
  IWeb3State,
  'address' | 'chainId' | 'provider' | 'providerType' | 'signer' | 'did' | 'publicKey' | 'authenticated' | 'role'
>;

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
