import { useState, useEffect } from 'react'
import Header from './components/Header'
import TickerBar from './components/TickerBar'
import SearchSection from './components/SearchSection'
import PumpLaunches from './components/PumpLaunches'
import VerdictModal from './components/VerdictModal'
import { useAnalysis } from './hooks/useAnalysis'

export default function App() {
  const [input, setInput] = useState('')
  const [showVerdict, setShowVerdict] = useState(false)
  const [evmAddress, setEvmAddress] = useState('')
  const [solAddress, setSolAddress] = useState('')
  const [terminalLines, setTerminalLines] = useState(['System ready...', 'Awaiting token input...'])
  
  const {
    isAnalyzing,
    analysisResult,
    pairChain,
    currentPrice,
    liquidity,
    marketCap,
    holders,
    volumeChange5m,
    recentPumpLaunches,
    isCheckingHoneypot,
    performAnalysis,
    checkHoneypot,
  } = useAnalysis(input, setTerminalLines)

  const connectEVM = () => {
    // Implement EVM connection logic
    setEvmAddress('0x1234...5678')
  }

  const connectSolana = () => {
    // Implement Solana connection logic
    setSolAddress('Sol1234...5678')
  }

  const shortenAddress = (addr: string) => {
    if (!addr) return ''
    return addr.slice(0, 6) + '...' + addr.slice(-4)
  }

  const savePosition = () => {
    console.log('Position saved')
    setShowVerdict(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1d3a] to-[#0f1629] text-slate-300 font-mono">
      <Header 
        evmAddress={evmAddress}
        solAddress={solAddress}
        onConnectEVM={connectEVM}
        onConnectSolana={connectSolana}
        shortenAddress={shortenAddress}
      />
      
      <TickerBar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <SearchSection
          input={input}
          isAnalyzing={isAnalyzing}
          onInputChange={setInput}
          onAnalyze={() => {
            performAnalysis()
            if (analysisResult) setShowVerdict(true)
          }}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-emerald-400 text-xs font-black uppercase mb-3">
              <i className="fas fa-terminal mr-2"></i> Analysis Terminal
            </h3>
            <div className="glassmorphism rounded-xl p-4 overflow-y-auto text-xs font-mono custom-scrollbar" style={{ height: '200px' }}>
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`mb-1 ${
                    line.includes('ERROR')
                      ? 'text-red-400'
                      : line.includes('WHALE')
                      ? 'text-amber-300'
                      : line.includes('LAUNCH')
                      ? 'text-purple-300'
                      : 'text-emerald-400/80'
                  }`}
                >
                  <span className="opacity-40 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-slate-400 text-xs font-black uppercase mb-3">
              <i className="fas fa-chart-bar mr-2"></i> Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="glassmorphism p-3 rounded-lg border-white/10">
                <div className="text-xs text-slate-400 uppercase">Price</div>
                <div className="text-lg font-black text-emerald-300">{currentPrice}</div>
              </div>
              <div className="glassmorphism p-3 rounded-lg border-white/10">
                <div className="text-xs text-slate-400 uppercase">Liquidity</div>
                <div className="text-lg font-black text-slate-200">{liquidity}</div>
              </div>
              <div className="glassmorphism p-3 rounded-lg border-white/10">
                <div className="text-xs text-slate-400 uppercase">Holders</div>
                <div className="text-lg font-black text-slate-200">{holders || '—'}</div>
              </div>
            </div>
          </div>
        </div>

        {recentPumpLaunches.length > 0 && (
          <PumpLaunches
            launches={recentPumpLaunches}
            onAudit={(mint) => {
              setInput(mint)
              setTimeout(() => performAnalysis(), 100)
            }}
            shortenAddress={shortenAddress}
          />
        )}
      </main>

      {showVerdict && analysisResult && (
        <VerdictModal
          verdict={analysisResult}
          terminalLines={terminalLines}
          pairChain={pairChain}
          currentPrice={currentPrice}
          liquidity={liquidity}
          marketCap={marketCap}
          holders={holders}
          volumeChange5m={volumeChange5m}
          isCheckingHoneypot={isCheckingHoneypot}
          onClose={() => setShowVerdict(false)}
          onCheckHoneypot={checkHoneypot}
          onSavePosition={savePosition}
        />
      )}
    </div>
  )
}
