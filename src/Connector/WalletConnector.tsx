import { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import WalletOptionList from "./WalletOptionList";

export default function WalletConnector() {
  const [showOptions, setShowOptions] = useState(false);

  if (!showOptions) {
    return <ConnectWalletButton onClick={() => setShowOptions(true)} />;
  }

  return <WalletOptionList />;
}
