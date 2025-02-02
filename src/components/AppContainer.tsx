import WalletInformation from "@/WalletInformation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { LoaderCircle } from "lucide-react";
import WalletConnector from "../WalletConnector";
import PageLayout from "./PageLayout";

export default function AppContainer() {
  const { loadingNetwork, sdkHasLoaded, primaryWallet } = useDynamicContext();

  let content = <LoaderCircle className="size-8 animate-spin" />;
  if (sdkHasLoaded && !loadingNetwork) {
    content = primaryWallet ? (
      <WalletInformation wallet={primaryWallet} />
    ) : (
      <WalletConnector />
    );
  }

  return <PageLayout>{content}</PageLayout>;
}
