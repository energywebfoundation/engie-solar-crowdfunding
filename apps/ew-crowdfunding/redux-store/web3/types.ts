/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProviderType } from 'iam-client-lib';
import { RoleEnrollmentStatus } from '../../context/web3/types';

export interface Web3ReducerState {
  isLoading: boolean;
  isConnectedToRightNetwork: boolean;
  isMetamaskPresent: boolean;
  provider?: any;
  providerType?: ProviderType;
  address?: string;
  chainId?: number;
  signer?: any;
  did?: string;
  publicKey?: string;
  authenticated?: boolean;
  roleEnrolmentStatus?: RoleEnrollmentStatus;
  isEthSigner?: string;
}

export const Web3ActionTypes = {
  SET_WEB3: 'SET_WEB3',
  RESET_WEB3: 'RESET_WEB3',
  SET_METAMASK_PRESENT: 'SET_METAMASK_PRESENT',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

export type UpdateWeb3Payload = Pick<
  Web3ReducerState,
  | 'address'
  | 'chainId'
  | 'provider'
  | 'providerType'
  | 'signer'
  | 'did'
  | 'publicKey'
  | 'authenticated'
  | 'roleEnrolmentStatus'
  | 'isEthSigner'
>;
