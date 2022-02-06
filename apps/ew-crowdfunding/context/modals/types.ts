import { Web3ModalConfig } from '../web3/types';
import { DSLAModalsActionsEnum } from './reducer';
import { ProviderType } from 'iam-client-lib';

export type TWeb3Notification = {
  open: boolean;
  config: Web3ModalConfig;
};

export type ILogin = {
  open: boolean;
  isConnectedToRightNetwork: boolean;
  isMetamaskPresent: boolean;
  login: (providerType: ProviderType) => void;
};

export type IRedeem = {
  open: boolean;
  tokenBalance: number;
};

export interface IDSLAModalsStore {
  notification: TWeb3Notification;
  login: ILogin;
  redeem: IRedeem;
}

interface IWeb3NotificationAction {
  type: DSLAModalsActionsEnum.SHOW_NOTIFICATION;
  payload: TWeb3Notification;
}

interface ILoginAction {
  type: DSLAModalsActionsEnum.SHOW_LOGIN;
  payload: ILogin;
}

interface IRedeemAction {
  type: DSLAModalsActionsEnum.SHOW_REDEEM;
  payload: IRedeem;
}

export type TDSLAModalsAction = IWeb3NotificationAction | ILoginAction | IRedeemAction;
