import { fromMetaMask, fromWalletConnectMetamask, SignerService } from './signer';
import { defaultBridgeUrl } from './utils';

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
