import { fromKms, fromMetaMask, fromWalletConnectMetamask, SignerService } from './signer';
import { defaultBridgeUrl, defaultKmsServerUrl } from './utils';

export async function initWithKms({ bridge = defaultBridgeUrl, kmsServerUrl = defaultKmsServerUrl } = {}) {
  return init(await fromKms(bridge, kmsServerUrl));
}

export async function initWithMetamask() {
  return init(await fromMetaMask());
}

export async function initWithWalletConnect(bridge = defaultBridgeUrl) {
  return init(await fromWalletConnectMetamask(bridge));
}

export async function init(signerService: SignerService) {
  return {
    signerService,
  };
}
