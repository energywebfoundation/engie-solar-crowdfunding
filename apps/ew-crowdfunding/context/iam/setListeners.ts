import { ProviderEvent, SignerService } from 'iam-client-lib';
import { Web3ModalConfig } from '../modals/types';

const displayAccountAndNetworkChanges = (changeType: ProviderEvent, callback: (config) => void) => {
  const { message, title } = getConfigInfo(changeType);

  const config: Web3ModalConfig = {
    title,
    text: `${message} Please login again.`,
  };
  callback(config);
};

const getConfigInfo = (type: ProviderEvent) => {
  switch (type) {
    case ProviderEvent.AccountChanged:
      return {
        title: 'Account Changed',
        message: 'Account has changed.',
      };
    case ProviderEvent.NetworkChanged:
      return {
        title: 'Network Changed',
        message: 'Network has changed.',
      };
    case ProviderEvent.Disconnected:
      return {
        title: 'Disconnected',
        message: 'You are disconnected from your wallet.',
      };
  }
};

export const setListeners = (signerService: SignerService, callback: (config) => void) => {
  signerService.on(ProviderEvent.AccountChanged, () => {
    displayAccountAndNetworkChanges(ProviderEvent.AccountChanged, callback);
  });

  signerService.on(ProviderEvent.NetworkChanged, () => {
    displayAccountAndNetworkChanges(ProviderEvent.NetworkChanged, callback);
  });

  signerService.on(ProviderEvent.Disconnected, () => {
    displayAccountAndNetworkChanges(ProviderEvent.Disconnected, callback);
  });

  signerService.on(ProviderEvent.NetworkChanged, () => {
    displayAccountAndNetworkChanges(ProviderEvent.NetworkChanged, callback);
  });
};
