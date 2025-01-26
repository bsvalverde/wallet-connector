import { Button } from "@/components/UI/Button";
import { WalletIcon } from "@dynamic-labs/wallet-book";

interface Props {
  wallet: { name: string; key: string };
  onClick: VoidFunction;
}

export default function WalletOptionListItem({ wallet, onClick }: Props) {
  const { key, name } = wallet;
  return (
    <li>
      <Button
        className="flex w-full flex-row items-center justify-start gap-2 text-left"
        onClick={onClick}
      >
        <WalletIcon className="size-6" walletKey={key} />
        <p>{name}</p>
      </Button>
    </li>
  );
}
