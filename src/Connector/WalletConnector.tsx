import { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import WalletOptionList from "./WalletOptionList";

export default function WalletConnector() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <ConnectWalletButton onClick={() => setShowOptions(true)} />
      <WalletOptionList
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
      />
    </>
  );
}
