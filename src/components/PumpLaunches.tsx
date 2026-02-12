interface Launch {
  mint: string
  symbol: string
  name: string
}

interface PumpLaunchesProps {
  launches: Launch[]
  onAudit: (mint: string) => void
  shortenAddress: (addr: string) => string
}

export default function PumpLaunches({ launches, onAudit, shortenAddress }: PumpLaunchesProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <h3 className="text-purple-300 text-xs font-black uppercase mb-3 flex items-center gap-2">
        <i className="fas fa-rocket"></i> Live Pump Feed
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {launches.map((launch) => (
          <div
            key={launch.mint}
            className="glassmorphism hover:bg-purple-500/10 border-purple-400/30 rounded-xl p-4 transition-all hover:border-purple-400/60"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-black text-white text-lg">${launch.symbol}</div>
                <div className="text-xs text-slate-400 truncate w-32">{launch.name}</div>
              </div>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-400/40">
                NEW
              </span>
            </div>
            <div className="flex justify-between items-center my-3 glassmorphism p-2 rounded">
              <span className="font-mono text-[10px] text-slate-400">{shortenAddress(launch.mint)}</span>
              <button
                onClick={() => copyToClipboard(launch.mint)}
                className="hover:text-emerald-300 text-slate-400 transition-colors"
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-2 rounded text-xs uppercase flex items-center justify-center gap-1 transition-all">
                <i className="fas fa-chart-line"></i> View
              </button>
              <button
                onClick={() => onAudit(launch.mint)}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold py-2 rounded text-xs uppercase flex items-center justify-center gap-1 transition-all"
              >
                <i className="fas fa-search"></i> Audit
              </button>
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-bold py-2 rounded text-xs uppercase flex items-center justify-center gap-1 transition-all">
                <i className="fas fa-bolt"></i> Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
