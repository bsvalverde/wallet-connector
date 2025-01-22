import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../utils/wagmi";
import AppContainer from "./AppContainer";

const queryClient = new QueryClient();

export default function RootContainer() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppContainer />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
