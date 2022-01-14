import { Web3ModalConfig } from '../web3/context/types';
import { DSLAModalsActionsEnum } from './reducer';

export type TWeb3Notification = {
  open: boolean;
  config: Web3ModalConfig;
};

export interface IDSLAModalsStore {
  notification: TWeb3Notification;
}

interface IDSLAModalsActionsEnum {
  type: DSLAModalsActionsEnum.SHOW_NOTIFICATION;
  payload: TWeb3Notification;
}

export type TDSLAModalsAction = | IDSLAModalsActionsEnum;
