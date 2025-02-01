export interface Network {
  chainId: string | number;
  name: string;
  vanityName?: string;
  iconUrls: string[];
  nativeCurrency: {
    symbol: string;
  };
}
