import { Button } from "@/components/UI/Button";
import { WalletOption } from "@/types/wallet";
import { WalletIcon } from "@dynamic-labs/wallet-book";

interface Props {
  wallet: WalletOption;
  onClick: VoidFunction;
}

export default function WalletOptionListItem({ wallet, onClick }: Props) {
  const { key, name } = wallet;

  return (
    <li>
      <Button
        className="flex h-auto w-full flex-row items-center justify-start gap-[14px] bg-foreground py-1.5 text-left hover:bg-secondary-foreground/20"
        onClick={onClick}
      >
        <WalletIcon className="size-10" walletKey={key} />
        <p>{name}</p>
      </Button>
    </li>
  );
}
