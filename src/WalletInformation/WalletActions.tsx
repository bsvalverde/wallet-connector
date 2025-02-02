import { LogoutIcon } from "@/components/Icons";
import { Button } from "@/components/UI/Button";
import {
  useDynamicContext,
  useDynamicEvents,
  useUserWallets,
  Wallet,
} from "@dynamic-labs/sdk-react-core";
import { MessageSigningDialog } from "./MessageSigningDialog";

interface Props {
  wallet: Wallet;
}

export function WalletActions({ wallet }: Props) {
  const { handleUnlinkWallet } = useDynamicContext();
  const userWallets = useUserWallets();

  useDynamicEvents("walletRemoved", () => {
    if (userWallets.length) {
      handleUnlinkWallet(userWallets[0].id);
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <MessageSigningDialog wallet={wallet} />
      <Button
        variant="secondary"
        className="hover:bg-secondary-foreground/10"
        onClick={() => handleUnlinkWallet(userWallets[0].id)}
      >
        <LogoutIcon />
        Disconnect
      </Button>
    </div>
  );
}
