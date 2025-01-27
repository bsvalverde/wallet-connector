import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
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
        initialAuthenticationMode: "connect-only",
        walletConnectors: [EthereumWalletConnectors], // TODO update
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <AppContainer />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
