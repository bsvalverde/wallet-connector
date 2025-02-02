import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import { LoadingButton } from "@/components/UI/LoadingButton";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import { useState } from "react";

interface Props {
  wallet: Wallet;
  isOpen: boolean;
  onWalletValidation: VoidFunction;
  onCancel: VoidFunction;
}

export function WalletAuthenticationDialog({
  wallet,
  isOpen,
  onWalletValidation,
  onCancel,
}: Props) {
  const [isSigning, setIsSigning] = useState(false);

  const handleMessageSign = async () => {
    setIsSigning(true);
    try {
      await wallet.signMessage(
        "Welcome to Wallet Connector. Signing is the only way we can truly know that you are the owner of the wallet you are connecting. Signing is a safe, gas-less transaction that does not in any way give Wallet Connector permission to perform any transactions with your wallet.",
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigning(false);
      onWalletValidation();
    }
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Sign a message</DialogTitle>
          <DialogDescription>
            Before proceeding, please sign a message to validate your identity.
            This is mandatory, and refusing to do it will automatically
            disconnect you.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-foreground hover:bg-secondary-foreground/20"
            disabled={isSigning}
            onClick={onCancel}
          >
            Close
          </Button>
          <LoadingButton
            type="submit"
            variant="secondary"
            loading={isSigning}
            onClick={handleMessageSign}
          >
            Sign
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
