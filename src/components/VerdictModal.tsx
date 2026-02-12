interface AnalysisResult {
  verdict: string
  riskLevel: string
  confidence: number
  findings?: string[]
  redFlags?: string[]
  devProfile?: {
    history: string
    reputation?: string
  }
  targets?: {
    entry: number
    exit: number
  }
  socialSentiment?: {
    vibe: string
  }
  contractAddress: string
}

interface VerdictModalProps {
  verdict: AnalysisResult
  terminalLines: string[]
  pairChain: string
  currentPrice: string
  liquidity: string
  marketCap: string
  holders: number | null
  volumeChange5m: number
  isCheckingHoneypot: boolean
  onClose: () => void
  onCheckHoneypot: () => void
  onSavePosition: () => void
}

export default function VerdictModal({
  verdict,
  pairChain,
  currentPrice,
  liquidity,
  marketCap,
  holders,
  volumeChange5m,
  isCheckingHoneypot,
  onClose,
  onCheckHoneypot,
  onSavePosition,
}: VerdictModalProps) {
  const formatPrice = (price: number) => {
    return '$' + price.toFixed(2)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatMC = (mc: string) => mc

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl glassmorphism-strong rounded-2xl shadow-2xl overflow-hidden my-auto glow-card border-emerald-400/40">
        {/* Header */}
        <div className="p-6 border-b border-emerald-400/20 glassmorphism">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-emerald-400 font-black uppercase tracking-widest">Forensic Verdict</span>
              <h2
                className={`text-4xl font-black italic mt-2 ${
                  verdict.riskLevel === 'LOW'
                    ? 'text-emerald-300'
                    : verdict.riskLevel === 'CRITICAL'
                    ? 'text-rose-400'
                    : 'text-amber-300'
                }`}
              >
                {verdict.verdict}
              </h2>
              <p className="text-sm uppercase font-bold text-slate-400 mt-1">
                Risk: {verdict.riskLevel} • Confidence: {verdict.confidence}%
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-widest block">Social Vibe</span>
              <span className="text-lg font-black text-emerald-300">{verdict.socialSentiment?.vibe || 'Neutral'}</span>
            </div>
          </div>
        </div>

        {/* Body - Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Findings + Red Flags */}
          <div className="space-y-4">
            <div className="glassmorphism p-4 rounded-xl border-emerald-400/30">
              <h3 className="text-xs font-black text-emerald-400 uppercase mb-3">Key Findings</h3>
              <ul className="space-y-2 text-sm">
                {verdict.findings?.map((f, i) => (
                  <li key={i} className="flex gap-2 text-slate-300">
                    <i className="fas fa-circle text-emerald-400 text-[6px] mt-2"></i>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {verdict.redFlags && verdict.redFlags.length > 0 && (
              <div className="glassmorphism p-4 rounded-xl border-rose-400/30">
                <h3 className="text-xs font-black text-rose-400 uppercase mb-3">Red Flags</h3>
                <ul className="space-y-2 text-sm">
                  {verdict.redFlags.map((flag, i) => (
                    <li key={i} className="flex gap-2 text-rose-300">
                      <i className="fas fa-exclamation-triangle text-rose-400 text-xs mt-1"></i>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Dev + Targets */}
          <div className="space-y-4">
            <div className="glassmorphism p-4 rounded-xl border-blue-400/30">
              <h3 className="text-xs font-black text-blue-400 uppercase mb-3">Developer Profile</h3>
              <p className="text-sm text-slate-300">{verdict.devProfile?.history || 'No data'}</p>
              {verdict.devProfile?.reputation && (
                <p className="text-xs text-slate-400 mt-2">Reputation: {verdict.devProfile.reputation}</p>
              )}
            </div>
            {verdict.targets && (
              <div className="glassmorphism p-4 rounded-xl border-purple-400/30">
                <h3 className="text-xs font-black text-purple-400 uppercase mb-3">Suggested Targets</h3>
                <div className="grid grid-cols-2 gap-4 text-lg font-black">
                  <div className="text-emerald-300">Entry: {formatPrice(verdict.targets.entry)}</div>
                  <div className="text-rose-300">Exit: {formatPrice(verdict.targets.exit)}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Stats */}
        <div className="px-6 pb-6">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Live Market Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Price', val: currentPrice },
              { label: 'Liquidity', val: liquidity },
              { label: 'MC/FDV', val: formatMC(marketCap) },
              { label: 'Holders', val: holders ?? '—' },
              {
                label: '5m Price Δ',
                val: volumeChange5m ? `${volumeChange5m}%` : '—',
                color: volumeChange5m > 0 ? 'text-emerald-400' : volumeChange5m < 0 ? 'text-red-400' : 'text-slate-300',
              },
            ].map((stat, i) => (
              <div key={i} className="glassmorphism p-3 rounded-lg border-white/10 text-center">
                <div className="text-xs text-slate-400 uppercase">{stat.label}</div>
                <div className={`text-lg font-black truncate ${stat.color || 'text-slate-200'}`}>{stat.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contract & Chart */}
        <div className="px-6 pb-6 space-y-6">
          <div className="glassmorphism p-4 rounded-lg border-emerald-400/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <i className="fas fa-file-code text-emerald-400"></i>
              <span className="font-mono text-sm text-slate-300 truncate max-w-xs">{verdict.contractAddress}</span>
            </div>
            <button
              onClick={() => copyToClipboard(verdict.contractAddress)}
              className="text-emerald-400 hover:text-emerald-300 font-bold uppercase text-xs transition-colors"
            >
              Copy CA
            </button>
          </div>
        </div>

        {/* Action Links */}
        <div className="px-6 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pairChain === 'solana' ? (
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-black py-3 rounded-xl uppercase text-xs flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-green-400/30">
                <i className="fas fa-bolt"></i> Buy Jupiter
              </button>
            ) : (
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black py-3 rounded-xl uppercase text-xs flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-400/30">
                <i className="fas fa-exchange-alt"></i> Trade
              </button>
            )}

            <button
              onClick={onCheckHoneypot}
              disabled={isCheckingHoneypot}
              className={`bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black py-3 rounded-xl uppercase text-xs flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-orange-400/30 ${
                isCheckingHoneypot ? 'opacity-50 cursor-wait' : ''
              }`}
            >
              <i className={`fas ${isCheckingHoneypot ? 'fa-spinner fa-spin' : 'fa-vial'}`}></i>
              {isCheckingHoneypot ? 'Checking...' : 'Honeypot'}
            </button>

            {pairChain === 'solana' && (
              <button
                onClick={onCheckHoneypot}
                disabled={isCheckingHoneypot}
                className={`bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black py-3 rounded-xl uppercase text-xs flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-red-400/30 ${
                  isCheckingHoneypot ? 'opacity-50 cursor-wait' : ''
                }`}
              >
                <i className={`fas ${isCheckingHoneypot ? 'fa-spinner fa-spin' : 'fa-skull'}`}></i>
                Rug Check
              </button>
            )}

            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-3 rounded-xl uppercase text-xs flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-emerald-400/30">
              <i className="fas fa-external-link-alt"></i> DexScreener
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-6 pb-6 border-t border-emerald-400/20 pt-6">
          <div className="flex gap-4">
            <button
              onClick={onSavePosition}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black py-4 rounded-xl uppercase text-xs flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-emerald-400/40"
            >
              <i className="fas fa-wallet"></i> Save to Portfolio
            </button>
            <button
              onClick={onClose}
              className="px-8 glassmorphism hover:bg-white/10 text-white font-bold py-4 rounded-xl uppercase text-xs transition-all"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
