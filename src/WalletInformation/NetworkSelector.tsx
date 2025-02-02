import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import {
  useDynamicContext,
  useSwitchNetwork,
  Wallet,
} from "@dynamic-labs/sdk-react-core";
import { useCallback, useEffect, useState } from "react";

interface Props {
  wallet: Wallet;
}

export function NetworkSelector({ wallet }: Props) {
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
    <Select
      value={`${currentNetworkChainId}`}
      onValueChange={handleNetworkChange}
      disabled={isNetworkLoading}
    >
      <SelectTrigger className="md:w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(networkOptions || []).map(
          ({ chainId, iconUrls, vanityName, name }) => (
            <SelectItem key={chainId} value={`${chainId}`}>
              <div className="flex flex-row items-center gap-1">
                {iconUrls[0] && (
                  <img
                    className="size-5"
                    src={iconUrls[0]}
                    alt={`${vanityName || name}'s icon`}
                  />
                )}
                <span className="px-1">{vanityName || name}</span>
              </div>
            </SelectItem>
          ),
        )}
      </SelectContent>
    </Select>
  );
}
