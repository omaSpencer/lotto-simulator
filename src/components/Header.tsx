import { Icons } from './icons'

export const Header = () => {
  return (
    <header className="gradient-header">
      <div className="max-w-5xl w-full mx-auto px-4 py-2 flex items-center gap-8">
        <Icons.LogoIcon />

        <h1 className="font-bold text-[40px] leading-[46px] text-white">
          Lottery Simulator
        </h1>
      </div>
    </header>
  )
}
