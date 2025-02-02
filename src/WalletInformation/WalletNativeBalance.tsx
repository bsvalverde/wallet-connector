import { SynergyIcon } from "@/components/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import {
  formatWalletAddress,
  formatWalletBalance,
} from "@/utils/formatWalletInformation";
import { useDynamicContext, Wallet } from "@dynamic-labs/sdk-react-core";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  wallet: Wallet;
  isNetworkLoading: boolean;
}

export default function WalletNativeBalance({
  wallet,
  isNetworkLoading,
}: Props) {
  const [balance, setBalance] = useState("");
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  const { network: currentNetworkChainId, networkConfigurations } =
    useDynamicContext();

  useEffect(() => {
    const fetchBalance = async () => {
      setIsBalanceLoading(true);
      setBalance((await wallet.getBalance()) || "");
      setIsBalanceLoading(false);
    };
    fetchBalance();
  }, [wallet, currentNetworkChainId]);

  const { evm: networkOptions } = networkConfigurations || {};

  const currentNetwork = networkOptions?.find(
    (network) => network.chainId === currentNetworkChainId,
  );

  return (
    <div className="flex flex-row items-center">
      <span className="flex min-w-24 items-center justify-center whitespace-nowrap px-3 text-sm font-medium tracking-default">
        {isNetworkLoading || isBalanceLoading ? (
          <LoaderCircle className="size-4 animate-spin opacity-70" />
        ) : (
          formatWalletBalance({ balance, network: currentNetwork })
        )}
      </span>
      <span className="text-muted-foreground">|</span>
      <Select value={wallet.id} disabled={isNetworkLoading}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={wallet.id} value={wallet.id}>
            <div className="flex flex-row items-center gap-1">
              <SynergyIcon className="size-4" />
              {formatWalletAddress(wallet.address)}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
