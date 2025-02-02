import {
  useDynamicContext,
  useSwitchNetwork,
  Wallet,
} from "@dynamic-labs/sdk-react-core";
import { useCallback, useEffect, useState } from "react";
import { NetworkSelector } from "./NetworkSelector";
import { WalletActions } from "./WalletActions";
import { WalletNativeBalance } from "./WalletNativeBalance";

interface Props {
  wallet: Wallet;
}

export function WalletInformation({ wallet }: Props) {
  const { network: currentNetworkChainId, networkConfigurations } =
    useDynamicContext();
  const switchNetwork = useSwitchNetwork();

  const [currentNetwork, setCurrentNetwork] = useState(
    parseInt(`${currentNetworkChainId}`) || 0,
  );
  const [isNetworkLoading, setIsNetworkLoading] = useState(false);

  useEffect(() => {
    if (currentNetwork === currentNetworkChainId) {
      setIsNetworkLoading(false);
    }
  }, [currentNetwork, currentNetworkChainId]);

  const handleNetworkChange = useCallback(
    async (chainId: string | number) => {
      setIsNetworkLoading(true);
      try {
        const networkId = parseInt(`${chainId}`);
        await switchNetwork({ wallet, network: networkId });
        setCurrentNetwork(networkId);
      } catch (error) {
        setIsNetworkLoading(false);
        console.error(error);
      }
    },
    [wallet, switchNetwork],
  );

  const { evm: networkOptions } = networkConfigurations || {};

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="rounded-default bg-card md:self-start">
        <NetworkSelector
          value={currentNetworkChainId || ""}
          networkOptions={networkOptions || []}
          disabled={isNetworkLoading}
          onNetworkSelect={handleNetworkChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="rounded-default bg-card">
          <WalletNativeBalance
            wallet={wallet}
            isNetworkLoading={isNetworkLoading}
          />
        </div>
        <div className="rounded-default bg-card p-4">
          <WalletActions wallet={wallet} />
        </div>
      </div>
    </div>
  );
}
