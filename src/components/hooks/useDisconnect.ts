import {
  useDynamicContext,
  useDynamicEvents,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";

export function useDisconnect() {
  const { handleUnlinkWallet } = useDynamicContext();
  const userWallets = useUserWallets();

  useDynamicEvents("walletRemoved", () => {
    if (userWallets.length) {
      handleUnlinkWallet(userWallets[0].id);
    }
  });

  const disconnect = () => handleUnlinkWallet(userWallets[0].id);

  return { disconnect };
}
