import { FilterChain, useWalletOptions } from "@dynamic-labs/sdk-react-core";
import { pipe } from "@dynamic-labs/utils";
import { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import WalletOptionList from "./WalletOptionList";

export default function WalletConnector() {
  const [showOptions, setShowOptions] = useState(false);

  const { getFilteredWalletOptions, selectWalletOption } = useWalletOptions();

  const walletOptions = getFilteredWalletOptions(
    pipe(FilterChain("EVM")).pipe((wallets) =>
      wallets.filter((wallet) => wallet.isInstalledOnBrowser),
    ),
  );

  return (
    <>
      <ConnectWalletButton onClick={() => setShowOptions(true)} />
      <WalletOptionList
        walletOptions={walletOptions}
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        onWalletSelect={selectWalletOption}
      />
    </>
  );
}
