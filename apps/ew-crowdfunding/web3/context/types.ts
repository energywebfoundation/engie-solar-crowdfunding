import { LoginOptions } from '../iam';
import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { Signer } from 'ethers';
import { IWeb3State } from '../state/types';

export interface IWeb3Context {
  provider?: any;
  providerType?: ProviderType;
  address?: string;
  chainId?: number;
  signer?: Signer;
  did?: string;
  login?: (loginOptions: LoginOptions) => void;
  logout?: () => void;
  isLoading: boolean;
}

export type TSetAccount = (data: Partial<IWeb3State>) => void;
export type TGetAccount = () => IWeb3State;
export type TRemoveAccount = () => void;
