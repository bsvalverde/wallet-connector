import { Spinner } from "@/components/UI/Spinner";
import { formatWalletBalance } from "@/utils/formatWalletInformation";
import {
  EvmNetwork,
  useDynamicContext,
  Wallet,
} from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";

interface Props {
  wallet: Wallet;
}

export function WalletNativeBalance({ wallet }: Props) {
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
  ) as EvmNetwork;

  return (
    <span className="flex min-w-24 items-center justify-center whitespace-nowrap px-3 text-sm font-medium tracking-default">
      {isBalanceLoading ? (
        <Spinner className="size-4 opacity-70" />
      ) : balance ? (
        formatWalletBalance({ balance, network: currentNetwork })
      ) : (
        "---"
      )}
    </span>
  );
}
