import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import env from "../utils/envSchema";
import { config } from "../utils/wagmi";
import AppContainer from "./AppContainer";

const queryClient = new QueryClient();

export default function RootContainer() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: env.VITE_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors], // TODO update
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <AppContainer />
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
