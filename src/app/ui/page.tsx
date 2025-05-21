import { Controls } from '@/components/Controls'
import { Header } from '@/components/Header'
import { SimulationStats } from '@/components/_SimulationStats'

const MOCK_DATA = {
  stats: {
    numOfTickets: 100,
    yearsSpent: 10,
    costOfTickets: 1000,
    winMatches: {
      2: 24,
      3: 12,
      4: 6,
      5: 2,
    },
  },
  controls: {
    winningNumbers: [1, 2, 3, 4, 5],
    playerNumbers: [5, 4, 3, 2, 1],
    isRandom: true,
    speed: 420,
  },
}

export default function Page() {
  return (
    <main>
      <Header />

      <section className="bg-white max-w-[792px] mx-auto rounded-3xl mt-12 py-12 px-[78px] shadow-float grid gap-8">
        <h2 className="font-bold text-[40px] leading-[46px] text-foreground">
          Result
        </h2>

        <SimulationStats {...MOCK_DATA.stats} />

        <Controls {...MOCK_DATA.controls} />
      </section>
    </main>
  )
}
