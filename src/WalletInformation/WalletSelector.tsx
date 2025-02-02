import { SynergyIcon } from "@/components/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { WalletSelectionDialog } from "@/components/WalletSelectionDialog";
import { formatWalletAddress } from "@/utils/formatWalletInformation";
import {
  useDynamicContext,
  useSwitchWallet,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { useState } from "react";

export function WalletSelector() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userWallets = useUserWallets();
  const { primaryWallet } = useDynamicContext();
  const switchWallet = useSwitchWallet();

  const currentWallet = primaryWallet!;

  return (
    <>
      <Select
        value={currentWallet.id}
        onValueChange={(newValue) => {
          if (newValue === "Open Dialog") {
            setIsDialogOpen(true);
          } else {
            switchWallet(newValue);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {userWallets.map((wallet) => (
            <SelectItem key={wallet.id} value={wallet.id}>
              <div className="flex flex-row items-center gap-1">
                <SynergyIcon className="size-4" />
                {formatWalletAddress(wallet.address)}
              </div>
            </SelectItem>
          ))}
          <SelectItem value={"Open Dialog"}>Connect new wallet</SelectItem>
        </SelectContent>
      </Select>
      <WalletSelectionDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
