import {
  formatWalletAddress,
  formatWalletBalance,
} from "@/utils/formatWalletInformation";
import { useDynamicContext, Wallet } from "@dynamic-labs/sdk-react-core";
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

  if (isNetworkLoading || isBalanceLoading) {
    return <div>loading network</div>;
  }

  return (
    <div>
      {formatWalletBalance({ balance, network: currentNetwork })}
      {" | "}
      {formatWalletAddress(wallet.address)}
    </div>
  );
}
