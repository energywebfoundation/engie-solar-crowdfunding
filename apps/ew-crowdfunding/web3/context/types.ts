import { Web3Provider } from '@ethersproject/providers';
import { LoginOptions } from '../iam';

export interface IWeb3Context {
  // provider?: any;
  // web3Provider?: Web3Provider;
  // address?: string;
  // chainId?: number;
  login?: (loginOptions: LoginOptions) => void;
  logout?: () => void;
}
