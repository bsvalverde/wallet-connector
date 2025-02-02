import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import { ScrollArea } from "@/components/UI/ScrollArea";
import {
  FilterChain,
  useDynamicEvents,
  useSwitchWallet,
  useWalletItemActions,
  useWalletOptions,
} from "@dynamic-labs/sdk-react-core";
import { pipe } from "@dynamic-labs/utils";
import { WalletSelectionOption } from "./WalletSelectionOption";

interface Props {
  isOpen: boolean;
  onOpenChange: (newValue: boolean) => void;
}

export function WalletSelectionModal({ isOpen, onOpenChange }: Props) {
  const switchWallet = useSwitchWallet();
  const { getFilteredWalletOptions } = useWalletOptions();
  const { openWallet } = useWalletItemActions();

  useDynamicEvents("walletAdded", (newWallet) => {
    switchWallet(newWallet.id);
    onOpenChange(false);
  });

  const walletOptions = getFilteredWalletOptions(
    pipe(FilterChain("EVM")).pipe((wallets) =>
      wallets.filter((wallet) => wallet.isInstalledOnBrowser),
    ),
  );

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
              <WalletSelectionOption
                key={option.key}
                wallet={option}
                onClick={() => openWallet(option.key)}
              />
            ))}
          </ul>
        </div>
      </ScrollArea>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
