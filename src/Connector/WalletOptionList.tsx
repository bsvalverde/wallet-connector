import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import { ScrollArea } from "@/components/UI/ScrollArea";
import { useWalletOptions } from "@dynamic-labs/sdk-react-core";
import WalletOptionListItem from "./WalletOptionListItem";

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function WalletOptionList({ isOpen, onClose }: Props) {
  const { getFilteredWalletOptions, selectWalletOption } = useWalletOptions();

  const walletOptions = getFilteredWalletOptions(
    (wallets) => wallets.filter((wallet) => wallet.isInstalledOnBrowser), // filter with appropriate walletConnectors https://docs.dynamic.xyz/wallets/advanced-wallets/sort-and-filter-wallets#usage
  );

  // TODO check if dynamic is loading

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-48">
          {walletOptions.length ? (
            <ul className="m-2 flex flex-col gap-2">
              {walletOptions.map((option) => (
                <WalletOptionListItem
                  key={option.key}
                  wallet={option}
                  onClick={() => selectWalletOption(option.key)}
                />
              ))}
            </ul>
          ) : (
            <p>message</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
