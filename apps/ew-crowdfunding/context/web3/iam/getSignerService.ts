import {
  initWithMetamask,
  initWithWalletConnect,
  ProviderType,
} from 'iam-client-lib';

export const getSignerService = (providerType: ProviderType) => {
  switch (providerType) {
    case ProviderType.MetaMask:
      return initWithMetamask();
    case ProviderType.WalletConnect:
      return initWithWalletConnect();
  }
};
