import { Button } from "@/components/UI/Button";
import { WalletSelectionModal } from "@/components/WalletSelectionModal";
import { useState } from "react";

export function WalletConnector() {
  const [showWalletSelectionModal, setShowWalletSelectionModal] =
    useState(false);

  return (
    <>
      <Button onClick={() => setShowWalletSelectionModal(true)}>
        Connect Wallet
      </Button>
      <WalletSelectionModal
        isOpen={showWalletSelectionModal}
        onOpenChange={setShowWalletSelectionModal}
      />
    </>
  );
}
