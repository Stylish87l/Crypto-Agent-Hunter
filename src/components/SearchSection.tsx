interface SearchSectionProps {
  input: string
  isAnalyzing: boolean
  onInputChange: (value: string) => void
  onAnalyze: () => void
}

export default function SearchSection({
  input,
  isAnalyzing,
  onInputChange,
  onAnalyze,
}: SearchSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-emerald-400 text-lg font-black uppercase">
        <i className="fas fa-search mr-2"></i> Token Audit Engine
      </h2>
      <div className="glassmorphism-strong rounded-xl p-2 shadow-lg focus-within:border-emerald-400/60 transition-all hover:bg-white/5">
        <div className="flex gap-2">
          <i className="fas fa-search text-emerald-400 self-center ml-4"></i>
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onAnalyze()}
            placeholder="PASTE TOKEN ADDRESS OR TICKER..."
            className="bg-transparent flex-1 px-4 py-3 outline-none uppercase font-bold text-white placeholder-slate-500"
          />
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black px-8 rounded-lg text-xs uppercase transition-all hover:shadow-lg hover:shadow-emerald-400/30 disabled:opacity-50 disabled:cursor-wait"
          >
            {isAnalyzing ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i> AUDITING
              </>
            ) : (
              'AUDIT'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
