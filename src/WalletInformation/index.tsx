import {
  useDynamicContext,
  useSwitchNetwork,
  Wallet,
} from "@dynamic-labs/sdk-react-core";
import { WalletSelector } from "./NetworkSelector";

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
  // const { tokenBalances, isLoading } = useTokenBalances();

  const { evm: networkOptions } = networkConfigurations || {};

  // TODO add loading feedback while network is changing

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <WalletSelector
        value={currentNetworkChainId || ""}
        networkOptions={networkOptions || []}
        onNetworkSelect={(chainId) =>
          switchNetwork({ wallet, network: parseInt(`${chainId}`) })
        }
      />
      <div className="flex flex-col gap-2">
        <p>balance select</p>
        <div>
          buttons
          <button onClick={() => handleUnlinkWallet(wallet.id)}>
            disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
