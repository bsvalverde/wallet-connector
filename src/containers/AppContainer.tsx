import WalletConnector from "../Connector/WalletConnector";

export default function AppContainer() {
  if (true) {
    return <WalletConnector />;
  }
  return (
    <p>
      has logic to connect. if not connected,show connect button. if connected,
      show options
    </p>
  );
}
