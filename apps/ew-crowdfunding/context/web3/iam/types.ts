import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';

export interface LoginOptions {
  providerType?: ProviderType;
  reinitializeMetamask?: boolean;
  initCacheServer?: boolean;
  createDocument?: boolean;
}
