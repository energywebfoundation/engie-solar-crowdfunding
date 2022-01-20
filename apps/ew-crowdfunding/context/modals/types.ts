import { Web3ModalConfig } from '../web3/types';
import { DSLAModalsActionsEnum } from './reducer';
import { LoginOptions } from '../web3/iam';

export type TWeb3Notification = {
  open: boolean;
  config: Web3ModalConfig;
};

export type ILogin = {
  open: boolean;
  isConnectedToRightNetwork: boolean;
  isMetamaskPresent: boolean;
  login: (loginOptions: LoginOptions) => void;
};

export interface IDSLAModalsStore {
  notification: TWeb3Notification;
  login: ILogin;
}

interface IWeb3NotificationAction {
  type: DSLAModalsActionsEnum.SHOW_NOTIFICATION;
  payload: TWeb3Notification;
}

interface ILoginAction {
  type: DSLAModalsActionsEnum.SHOW_LOGIN;
  payload: ILogin;
}

export type TDSLAModalsAction = IWeb3NotificationAction | ILoginAction;
