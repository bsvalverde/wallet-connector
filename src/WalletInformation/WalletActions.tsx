import { useDisconnect } from "@/components/hooks/useDisconnect";
import { LogoutIcon } from "@/components/Icons";
import { Button } from "@/components/UI/Button";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import { MessageSigningDialog } from "./MessageSigningDialog";

interface Props {
  wallet: Wallet;
}

export function WalletActions({ wallet }: Props) {
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col gap-2">
      <MessageSigningDialog wallet={wallet} />
      <Button
        variant="secondary"
        className="hover:bg-secondary-foreground/10"
        onClick={disconnect}
      >
        <LogoutIcon />
        Disconnect
      </Button>
    </div>
  );
}
