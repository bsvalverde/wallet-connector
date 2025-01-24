import { useWalletOptions } from "@dynamic-labs/sdk-react-core";

export default function WalletOptionList() {
  const { getFilteredWalletOptions } = useWalletOptions();

  const walletOptions = getFilteredWalletOptions(
    (wallets) => wallets.filter((wallet) => wallet.isInstalledOnBrowser) // filter with appropriate walletConnectors https://docs.dynamic.xyz/wallets/advanced-wallets/sort-and-filter-wallets#usage
  );

  return (
    <ul>
      {walletOptions.map((connector) => (
        <li>{connector.name}</li>
      ))}
    </ul>
  );
}
