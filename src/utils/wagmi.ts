import { mainnet, sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";

export const config = createConfig({
  chains: [mainnet, sepolia], // TODO update
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
