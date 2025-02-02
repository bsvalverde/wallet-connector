import { useDisconnect } from "@/components/hooks/useDisconnect";
import { LogoutIcon } from "@/components/Icons";
import { LoadingButton } from "@/components/UI/LoadingButton";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import { MessageSigningDialog } from "./MessageSigningDialog";

interface Props {
  wallet: Wallet;
}

export function WalletActions({ wallet }: Props) {
  const { disconnect, isDisconnecting } = useDisconnect();

  return (
    <div className="flex flex-col gap-2">
      <MessageSigningDialog wallet={wallet} />
      <LoadingButton
        variant="secondary"
        className="hover:bg-secondary-foreground/10"
        loading={isDisconnecting}
        onClick={disconnect}
      >
        <LogoutIcon />
        Disconnect
      </LoadingButton>
    </div>
  );
}
