export enum AssetHistoryEventType {
  ASSET_CREATED = 'ASSET_CREATED',
  ASSET_OFFERED = 'ASSET_OFFERED',
  ASSET_OFFER_CANCELED = 'ASSET_OFFER_CANCELED',
  ASSET_TRANSFERRED = 'ASSET_TRANSFERRED',
  ASSET_OFFER_REJECTED = 'ASSET_OFFER_REJECTED',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface CacheServerClientOptions {
  url: string;
  cacheServerSupportsAuth?: boolean;
}

export type ClaimsFilter = {
  isAccepted?: boolean;
  namespace?: string;
};

export type AssetsFilter = {
  order?: Order;
  take?: number;
  skip?: number;
  type?: AssetHistoryEventType;
};

export enum SearchType {
  App = 'App',
  Org = 'Org',
  Role = 'Role',
}

export const TEST_LOGIN_ENDPOINT = '/auth/status';
