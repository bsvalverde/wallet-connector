import {
  useDynamicContext,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import PageLayout from "../components/PageLayout";
import WalletConnector from "../WalletConnector";

export default function AppContainer() {
  const userWallets = useUserWallets();
  const { handleUnlinkWallet } = useDynamicContext();

  return (
    <PageLayout>
      {!userWallets.length ? (
        <WalletConnector />
      ) : (
        <button onClick={() => handleUnlinkWallet(userWallets[0].id)}>
          disconnect
        </button>
      )}
    </PageLayout>
  );
}
