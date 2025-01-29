import { bsc, mainnet } from "viem/chains";
import { createConfig, http } from "wagmi";

export const config = createConfig({
  chains: [mainnet, bsc],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
