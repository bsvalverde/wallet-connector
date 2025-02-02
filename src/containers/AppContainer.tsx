import { WalletInformation } from "@/WalletInformation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { WalletConnector } from "../WalletConnector";
import PageLayout from "../components/PageLayout";
import { Spinner } from "../components/UI/Spinner";

export function AppContainer() {
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();

  let content = <Spinner className="size-8" />;
  if (sdkHasLoaded) {
    content = primaryWallet ? (
      <WalletInformation wallet={primaryWallet} />
    ) : (
      <WalletConnector />
    );
  }

  return <PageLayout>{content}</PageLayout>;
}
