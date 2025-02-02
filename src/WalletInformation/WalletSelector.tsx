import { SynergyIcon } from "@/components/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { WalletSelectionModal } from "@/components/WalletSelectionModal";
import { formatWalletAddress } from "@/utils/formatWalletInformation";
import {
  useDynamicContext,
  useSwitchWallet,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { useState } from "react";

interface Props {
  disabled: boolean;
}

export function WalletSelector({ disabled }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userWallets = useUserWallets();
  const { primaryWallet } = useDynamicContext();
  const switchWallet = useSwitchWallet();

  const currentWallet = primaryWallet!;

  return (
    <>
      <Select
        value={currentWallet.id}
        disabled={disabled}
        onValueChange={(newValue) => {
          if (newValue === "Open Modal") {
            setIsModalOpen(true);
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
          <SelectItem value={"Open Modal"}>Connect new wallet</SelectItem>
        </SelectContent>
      </Select>
      <WalletSelectionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
