import { useState } from 'react'

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

interface Launch {
  mint: string
  symbol: string
  name: string
}

export function useAnalysis(
  input: string,
  setTerminalLines: (lines: string[]) => void
) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [pairChain, setPairChain] = useState('solana')
  const [currentPrice, setCurrentPrice] = useState('$0.0000')
  const [liquidity, setLiquidity] = useState('$0.00')
  const [marketCap, setMarketCap] = useState('$0.00')
  const [holders, setHolders] = useState<number | null>(null)
  const [volumeChange5m, setVolumeChange5m] = useState(0)
  const [recentPumpLaunches, setRecentPumpLaunches] = useState<Launch[]>([
    { mint: '11111111111111111111111111111111', symbol: 'DEMO', name: 'Demo Token' },
    { mint: '22222222222222222222222222222222', symbol: 'TEST', name: 'Test Token' },
  ])
  const [isCheckingHoneypot, setIsCheckingHoneypot] = useState(false)

  const performAnalysis = () => {
    if (!input.trim()) return

    setIsAnalyzing(true)
    setTerminalLines((prev) => [...prev, `[ANALYSIS] Starting audit for ${input}`])

    // Simulate analysis delay
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        verdict: 'PROCEED WITH CAUTION',
        riskLevel: 'MEDIUM',
        confidence: 78,
        findings: [
          'Token has adequate liquidity',
          'Developer history shows previous successful projects',
          'Community engagement appears organic',
        ],
        redFlags: ['High whale concentration detected', 'Recent ownership transfer'],
        devProfile: {
          history: 'Known developer with 5+ successful launches',
          reputation: 'Good',
        },
        targets: {
          entry: 0.00025,
          exit: 0.0008,
        },
        socialSentiment: {
          vibe: 'Bullish',
        },
        contractAddress: '0x' + input.slice(0, 40),
      }

      setAnalysisResult(mockResult)
      setCurrentPrice('$0.000456')
      setLiquidity('$234,567')
      setMarketCap('$2,345,678')
      setHolders(1234)
      setVolumeChange5m(5.23)
      setPairChain('solana')

      setTerminalLines((prev) => [
        ...prev,
        '[SUCCESS] Analysis complete',
        '[DATA] Risk Level: ' + mockResult.riskLevel,
        '[DATA] Confidence: ' + mockResult.confidence + '%',
      ])

      setIsAnalyzing(false)
    }, 2000)
  }

  const checkHoneypot = () => {
    setIsCheckingHoneypot(true)
    setTerminalLines((prev) => [...prev, '[HONEYPOT] Scanning for contract vulnerabilities...'])

    setTimeout(() => {
      setTerminalLines((prev) => [...prev, '[HONEYPOT] Result: No honeypot detected ✓'])
      setIsCheckingHoneypot(false)
    }, 1500)
  }

  return {
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
  }
}
