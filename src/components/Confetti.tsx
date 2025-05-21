import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'

export const Confetti = ({ onRestart }: { onRestart: () => void }) => {
  const { width, height } = useWindowSize()

  return (
    <section className="fixed inset-0 z-50 pointer-events-none backdrop-blur-sm bg-background/50">
      <ReactConfetti width={width} height={height} />

      <div className="absolute inset-0 items-center justify-center pointer-events-auto bg-primary text-white rounded-lg max-w-2xl m-auto max-h-[300px] p-4 shadow-sm flex flex-col gap-4">
        <h2 className="font-bold title-fSize text-center">Jackpot! 🎉</h2>

        <button
          className="text-primary bg-white rounded-sm px-4 py-2 min-h-10 min-w-[180px] font-bold"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </section>
  )
}
