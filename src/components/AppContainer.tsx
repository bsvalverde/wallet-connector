import { WalletInformation } from "@/WalletInformation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { WalletConnector } from "../WalletConnector";
import PageLayout from "./PageLayout";
import { Spinner } from "./UI/Spinner";

export function AppContainer() {
  const { loadingNetwork, sdkHasLoaded, primaryWallet } = useDynamicContext();

  let content = <Spinner className="size-8" />;
  if (sdkHasLoaded && !loadingNetwork) {
    content = primaryWallet ? (
      <WalletInformation wallet={primaryWallet} />
    ) : (
      <WalletConnector />
    );
  }

  return <PageLayout>{content}</PageLayout>;
}
