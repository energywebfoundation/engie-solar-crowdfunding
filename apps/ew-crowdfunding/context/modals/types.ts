import { DSLAModalsActionsEnum } from './reducer';
import { ProviderType } from 'iam-client-lib';

export type Web3ModalConfig = {
  title: string;
  text: string;
};

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
  releaseRewardsDate: Date;
  onRedeem: (amount: number) => void;
  onRedeemAll: () => void;
};

export type IConfirm = {
  open: boolean;
  title?: string;
  text: string;
  onConfirm: () => void;
};

export type ICongrats = {
  open: boolean;
};

export type ILend = {
  open: boolean;
  amount: number;
  onLend: (amount: number) => void;
};

export interface IDSLAModalsStore {
  notification: TWeb3Notification;
  login: ILogin;
  redeem: IRedeem;
  confirm: IConfirm;
  congrats: ICongrats;
  lend: ILend;
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

interface IConfirmAction {
  type: DSLAModalsActionsEnum.SHOW_CONFIRM;
  payload: IConfirm;
}

interface ICongratsAction {
  type: DSLAModalsActionsEnum.SHOW_CONGRATS;
  payload: ICongrats;
}

interface ILendAction {
  type: DSLAModalsActionsEnum.SHOW_LEND;
  payload: ILend;
}

export type TDSLAModalsAction =
  | IWeb3NotificationAction
  | ILoginAction
  | IRedeemAction
  | IConfirmAction
  | ICongratsAction
  | ILendAction;
