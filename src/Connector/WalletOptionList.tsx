import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import { ScrollArea } from "@/components/UI/ScrollArea";
import {
  useDynamicContext,
  useWalletOptions,
} from "@dynamic-labs/sdk-react-core";
import { LoaderCircle } from "lucide-react";
import WalletOptionListItem from "./WalletOptionListItem";

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function WalletOptionList({ isOpen, onClose }: Props) {
  const { sdkHasLoaded } = useDynamicContext();
  const { getFilteredWalletOptions, selectWalletOption } = useWalletOptions();

  const walletOptions = getFilteredWalletOptions(
    (wallets) => wallets.filter((wallet) => wallet.isInstalledOnBrowser), // filter with appropriate walletConnectors https://docs.dynamic.xyz/wallets/advanced-wallets/sort-and-filter-wallets#usage
  );

  let content = <LoaderCircle className="animate-spin" />;
  if (sdkHasLoaded) {
    if (walletOptions.length) {
      content = (
        <ScrollArea className="-mx-1 h-60 w-full">
          <div className="w-full px-1">
            <ul className="flex flex-col gap-2 pt-2">
              {walletOptions.map((option) => (
                <WalletOptionListItem
                  key={option.key}
                  wallet={option}
                  onClick={() => selectWalletOption(option.key)}
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
