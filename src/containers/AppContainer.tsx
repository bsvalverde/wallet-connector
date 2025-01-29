import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { LoaderCircle } from "lucide-react";
import PageLayout from "../components/PageLayout";
import WalletConnector from "../WalletConnector";

export default function AppContainer() {
  const { sdkHasLoaded, primaryWallet, handleUnlinkWallet } =
    useDynamicContext();

  let content = <LoaderCircle className="size-8 animate-spin" />;
  if (sdkHasLoaded) {
    content = primaryWallet ? (
      <button onClick={() => handleUnlinkWallet(primaryWallet.id)}>
        disconnect
      </button>
    ) : (
      <WalletConnector />
    );
  }

  return <PageLayout>{content}</PageLayout>;
}
