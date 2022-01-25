import { LoginOptions } from './iam';
import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { Signer } from 'ethers';
import { IWeb3State } from './state/types';

export interface IWeb3Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider?: any;
  providerType?: ProviderType;
  address?: string;
  chainId?: number;
  signer?: Signer;
  did?: string;
  publicKey?: string;
  authenticated?: boolean;
  role?: RoleEnrollmentStatus;
  login?: (loginOptions: LoginOptions) => void;
  logout?: () => void;
  isLoading: boolean;
  isConnectedToRightNetwork: boolean;
  isMetamaskPresent?: boolean;
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen?: (open: boolean) => void;
}

export type TSetAccount = (data: Partial<IWeb3State>) => void;
export type TGetAccount = () => IWeb3State;
export type TRemoveAccount = () => void;

export type Web3ModalConfig = {
  title: string;
  text: string;
};

export enum RoleEnrollmentStatus {
  NOT_ENROLLED = 'Not Enrolled',
  ENROLLED_NOT_APPROVED = 'Not Approved',
  ENROLLED_APPROVED = 'Enrolled Approved But Not Synced',
  ENROLLED_SYNCED = 'Enrolled And Synced',
  REJECTED = 'Enrolment rejected',
}
