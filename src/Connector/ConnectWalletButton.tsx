interface Props {
  onClick: VoidFunction;
}

export default function ConnectWalletButton({ onClick }: Props) {
  return <button onClick={onClick}>Connect Wallet</button>;
}
