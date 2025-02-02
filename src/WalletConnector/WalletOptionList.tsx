import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import { ScrollArea } from "@/components/UI/ScrollArea";
import { WalletOption } from "@/types/wallet";
import WalletOptionListItem from "./WalletOptionListItem";

interface Props {
  walletOptions: WalletOption[];
  isOpen: boolean;
  onClose: VoidFunction;
  onWalletSelect: (walletKey: string) => void;
}

export default function WalletOptionList({
  walletOptions,
  isOpen,
  onClose,
  onWalletSelect,
}: Props) {
  let content = (
    <p className="text-center text-sm">
      There are no wallets installed.
      <br /> Once you install a wallet, it will appear here.
    </p>
  );
  if (walletOptions.length) {
    content = (
      <ScrollArea className="-mx-1 size-full">
        <div className="w-full px-1">
          <ul className="flex flex-col gap-2 pt-2">
            {walletOptions.map((option) => (
              <WalletOptionListItem
                key={option.key}
                wallet={option}
                onClick={() => onWalletSelect(option.key)}
              />
            ))}
          </ul>
        </div>
      </ScrollArea>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        aria-describedby={undefined}
        hideOverlay
      >
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="flex h-60 items-center justify-center">{content}</div>
      </DialogContent>
    </Dialog>
  );
}
