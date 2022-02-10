/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheClient, Claim, ClaimsService, ProviderType, SignerService } from 'iam-client-lib';
export interface Web3ReducerState {
  isLoading: boolean;
  isConnectedToRightNetwork: boolean;
  isMetamaskPresent: boolean;
  errorMessage: string;
  provider?: any;
  providerType?: ProviderType;
  address?: string;
  chainId?: number;
  signer?: any;
  did?: string;
  publicKey?: string;
  authenticated?: boolean;
  isEthSigner?: string;

  roleEnrolmentStatus: RoleEnrollmentStatus;
  signerService: SignerService;
  cacheClient: CacheClient;
  claims: Claim[];
  claimsService: ClaimsService;
  role: Claim;
}

export const Web3ActionTypes = {
  SET_WEB3_SUCCESS: 'SET_WEB3_SUCCESS',
  SET_WEB3_FAILURE: 'SET_WEB3_FAILURE',
  RESET_WEB3: 'RESET_WEB3',
  SET_METAMASK_PRESENT: 'SET_METAMASK_PRESENT',
  UPDATE_ROLE_ENROLLMENT_STATUS: 'UPDATE_ROLE_ENROLLMENT_STATUS',
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
  | 'isEthSigner'
>;

export type TSetAccount = (data: Partial<UpdateWeb3Payload>) => void;
export type TGetAccount = () => UpdateWeb3Payload;
export type TRemoveAccount = () => void;

export enum RoleEnrollmentStatus {
  NOT_ENROLLED = 'Not Enrolled',
  ENROLLED_NOT_APPROVED = 'Not Approved',
  ENROLLED_APPROVED = 'Enrolled Approved But Not Synced',
  ENROLLED_SYNCED = 'Enrolled And Synced',
  REJECTED = 'Enrolment rejected',
}
