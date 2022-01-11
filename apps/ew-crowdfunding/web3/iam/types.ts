import { ProviderType } from "iam-client-lib";

export interface LoginOptions {
  providerType?: ProviderType;
  reinitializeMetamask?: boolean;
  initCacheServer?: boolean;
  createDocument?: boolean;
}
