import { Button } from "@/components/UI/Button";
import {
  FilterChain,
  useWalletItemActions,
  useWalletOptions,
} from "@dynamic-labs/sdk-react-core";
import { pipe } from "@dynamic-labs/utils";
import { useState } from "react";
import WalletOptionList from "./WalletOptionList";

export default function WalletConnector() {
  const [showOptions, setShowOptions] = useState(false);

  const { getFilteredWalletOptions } = useWalletOptions();
  const { openWallet } = useWalletItemActions();

  const walletOptions = getFilteredWalletOptions(
    pipe(FilterChain("EVM")).pipe((wallets) =>
      wallets.filter((wallet) => wallet.isInstalledOnBrowser),
    ),
  );

  return (
    <>
      <Button onClick={() => setShowOptions(true)}>Connect Wallet</Button>
      <WalletOptionList
        walletOptions={walletOptions}
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        onWalletSelect={openWallet}
      />
    </>
  );
}
