interface HeaderProps {
  evmAddress: string
  solAddress: string
  onConnectEVM: () => void
  onConnectSolana: () => void
  shortenAddress: (addr: string) => string
}

export default function Header({
  evmAddress,
  solAddress,
  onConnectEVM,
  onConnectSolana,
  shortenAddress,
}: HeaderProps) {
  return (
    <header className="px-6 py-4 glassmorphism-strong flex justify-between items-center z-10 sticky top-0">
      <div className="flex items-center gap-3">
        <i className="fas fa-bolt text-emerald-400 text-2xl animate-pulse"></i>
        <h1 className="font-black text-white uppercase text-lg tracking-wider">
          Agent Hunter <span className="text-emerald-400">Pro</span> v6.5
        </h1>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onConnectEVM}
          className="glassmorphism hover:bg-blue-600/30 text-blue-300 px-6 py-2 rounded-lg text-xs uppercase font-black flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-400/30"
        >
          <i className="fas fa-wallet"></i> {evmAddress ? shortenAddress(evmAddress) : 'Connect EVM'}
        </button>
        <button
          onClick={onConnectSolana}
          className="glassmorphism hover:bg-purple-600/30 text-purple-300 px-6 py-2 rounded-lg text-xs uppercase font-black flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-purple-400/30"
        >
          <i className="fas fa-ghost"></i> {solAddress ? shortenAddress(solAddress) : 'Connect SOL'}
        </button>
      </div>
    </header>
  )
}
