import { Button } from "@/components/UI/Button";
import { WalletSelectionDialog } from "@/components/WalletSelectionDialog";
import { useState } from "react";

export function WalletConnector() {
  const [showWalletSelectionDialog, setShowWalletSelectionDialog] =
    useState(false);

  return (
    <>
      <Button onClick={() => setShowWalletSelectionDialog(true)}>
        Connect Wallet
      </Button>
      <WalletSelectionDialog
        isOpen={showWalletSelectionDialog}
        onOpenChange={setShowWalletSelectionDialog}
      />
    </>
  );
}
