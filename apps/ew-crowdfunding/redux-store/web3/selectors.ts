import { createSelector, Selector } from 'reselect';
import { RootState } from '../root-reducer';
import { Web3ReducerState } from './types';

const selectWeb3: Selector<RootState, Web3ReducerState> = (state) => state.web3;

export const selectIsLoading = createSelector([selectWeb3], (web3) => web3.isLoading);
export const selectIsConnectedToRightNetwork = createSelector([selectWeb3], (web3) => web3.isConnectedToRightNetwork);
export const selectIsMetamaskPresent = createSelector([selectWeb3], (web3) => web3.isMetamaskPresent);
export const selectProvider = createSelector([selectWeb3], (web3) => web3.provider);
export const selectProviderType = createSelector([selectWeb3], (web3) => web3.providerType);
export const selectAddress = createSelector([selectWeb3], (web3) => web3.address);
export const selectChainId = createSelector([selectWeb3], (web3) => web3.chainId);
export const selectSigner = createSelector([selectWeb3], (web3) => web3.signer);
export const selectDid = createSelector([selectWeb3], (web3) => web3.did);
export const selectPublicKey = createSelector([selectWeb3], (web3) => web3.publicKey);
export const selectAuthenticated = createSelector([selectWeb3], (web3) => web3.authenticated);
export const selectIsEthSigner = createSelector([selectWeb3], (web3) => web3.isEthSigner);

export const selectRoleEnrollmentStatus = createSelector([selectWeb3], (web3) => web3.roleEnrolmentStatus);
