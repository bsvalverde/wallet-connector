import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import { ScrollArea } from "@/components/UI/ScrollArea";
import { WalletOption } from "@/types/wallet";
import { LoaderCircle } from "lucide-react";
import WalletOptionListItem from "./WalletOptionListItem";

interface Props {
  walletOptions: WalletOption[];
  isLoading: boolean;
  isOpen: boolean;
  onClose: VoidFunction;
  onWalletSelect: (walletKey: string) => void;
}

export default function WalletOptionList({
  walletOptions,
  isLoading,
  isOpen,
  onClose,
  onWalletSelect,
}: Props) {
  let content = <LoaderCircle className="animate-spin" />;
  if (!isLoading) {
    if (walletOptions.length) {
      content = (
        <ScrollArea className="-mx-1 h-60 w-full">
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
    } else {
      content = (
        <p className="text-center text-sm">
          There are no compatible wallets installed.
          <br /> Once you install a compatible wallet, it will appear here.
        </p> // TODO explain what are the compatible wallets
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="flex h-60 items-center justify-center">{content}</div>
      </DialogContent>
    </Dialog>
  );
}
