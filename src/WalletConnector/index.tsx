import {
  useDynamicContext,
  useWalletOptions,
} from "@dynamic-labs/sdk-react-core";
import { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import WalletOptionList from "./WalletOptionList";

export default function WalletConnector() {
  const [showOptions, setShowOptions] = useState(false);

  const { sdkHasLoaded } = useDynamicContext();
  const { getFilteredWalletOptions, selectWalletOption } = useWalletOptions();

  const walletOptions = getFilteredWalletOptions(
    (wallets) => wallets.filter((wallet) => wallet.isInstalledOnBrowser), // filter with appropriate walletConnectors https://docs.dynamic.xyz/wallets/advanced-wallets/sort-and-filter-wallets#usage
  );

  return (
    <>
      <ConnectWalletButton onClick={() => setShowOptions(true)} />
      <WalletOptionList
        walletOptions={walletOptions}
        isLoading={!sdkHasLoaded}
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        onWalletSelect={selectWalletOption}
      />
    </>
  );
}
