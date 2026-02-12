const tickers = [
  { symbol: 'BTC', price: '$95,234.50', change: '+2.45%' },
  { symbol: 'ETH', price: '$3,456.20', change: '+1.23%' },
  { symbol: 'SOL', price: '$234.56', change: '+3.12%' },
  { symbol: 'PUMP', price: '$0.0234', change: '+12.45%' },
]

export default function TickerBar() {
  return (
    <div className="glassmorphism py-2 overflow-hidden whitespace-nowrap flex">
      <div className="animate-marquee inline-block">
        {[...tickers, ...tickers].map((t, i) => (
          <span key={i} className="mx-6 text-xs font-mono font-bold text-slate-300">
            {t.symbol} <span className="text-emerald-300">${t.price}</span>{' '}
            <span className={t.change.includes('-') ? 'text-red-400' : 'text-emerald-400'}>
              ({t.change})
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
