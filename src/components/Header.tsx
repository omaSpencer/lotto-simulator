import { Icons } from './icons'

export const Header = () => {
  return (
    <header className="gradient-header">
      <div className="max-w-5xl w-full mx-auto px-5 py-4 max-h-[60px] overflow-hidden md:py-2 flex items-center gap-6 lg:gap-8">
        <Icons.LogoIcon />

        <h1 className="font-bold title-fSize text-white">Lottery Simulator</h1>
      </div>
    </header>
  )
}
