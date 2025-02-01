import {
  useDynamicContext,
  useSwitchNetwork,
  Wallet,
} from "@dynamic-labs/sdk-react-core";
import { useCallback, useEffect, useState } from "react";
import { WalletSelector } from "./NetworkSelector";
import WalletActions from "./WalletActions";
import WalletNativeBalance from "./WalletNativeBalance";

interface Props {
  wallet: Wallet;
}

export default function WalletInformation({ wallet }: Props) {
  const {
    network: currentNetworkChainId,
    networkConfigurations,
    handleUnlinkWallet,
  } = useDynamicContext();
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
      <WalletSelector
        value={currentNetworkChainId || ""}
        networkOptions={networkOptions || []}
        disabled={isNetworkLoading}
        onNetworkSelect={handleNetworkChange}
      />
      <div className="flex flex-col gap-2">
        <WalletNativeBalance
          wallet={wallet}
          isNetworkLoading={isNetworkLoading}
        />
        <div>
          <WalletActions />
          buttons
          <button onClick={() => handleUnlinkWallet(wallet.id)}>
            disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
