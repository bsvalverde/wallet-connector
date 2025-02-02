import { Button } from "@/components/UI/Button";
import { WalletOption } from "@/types/wallet";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import { WalletIcon } from "@dynamic-labs/wallet-book";

interface Props {
  wallet: WalletOption;
  onClick: VoidFunction;
}

export function WalletSelectionOption({ wallet, onClick }: Props) {
  const userWallets = useUserWallets();

  const { key, name } = wallet;
  const isWalletConnected = Boolean(
    userWallets.find((userWallet) => userWallet.key === key),
  );

  return (
    <li>
      <Button
        className="flex h-auto w-full flex-row items-center justify-start gap-[14px] bg-foreground py-1.5 text-left hover:bg-secondary-foreground/20"
        onClick={onClick}
        disabled={isWalletConnected}
      >
        <WalletIcon className="size-10" walletKey={key} />
        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis">{name}</p>
          {isWalletConnected && (
            <div className="flex flex-row items-center gap-1">
              <div className="size-2 rounded-full bg-green-500" />
              <p className="text-xs italic">Connected</p>
            </div>
          )}
        </div>
      </Button>
    </li>
  );
}
