import { Stats } from '@/types'

export default function SimulationStats({ cost, years, wins, index }: Stats) {
  return (
    <div className="bg-gray-100 p-4 rounded-md text-gray-900">
      <p>
        <strong>Draws:</strong> {index}
      </p>
      <p>
        <strong>Years Passed:</strong> {years}
      </p>
      <p>
        <strong>Total Cost:</strong> {cost.toLocaleString()} HUF
      </p>
      <p>
        <strong>Wins:</strong> 2 hit: {wins[2]} | 3 hit: {wins[3]} | 4 hit:{' '}
        {wins[4]} | 5 hit: {wins[5]}
      </p>
    </div>
  )
}
