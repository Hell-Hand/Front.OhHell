import { Flame, Swords } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classicBg from '@/games/classic/assets/backgrounds/game-table-bg.png';
import card1Espada8Bit from '@/games/classic/assets/cards/spanish-8bit/1espada.png';
import card3Paus8Bit from '@/games/classic/assets/cards/spanish-8bit/3paus.png';
import card12Copas8Bit from '@/games/classic/assets/cards/spanish-8bit/12copas.png';
import hellHandBg from '@/games/hell-hand/assets/backgrounds/hell-hand-bg.avif';
import { cn } from '@/shared/lib/utils.js';

const gameModes = [
  {
    accentClass: 'from-emerald-900/70 via-black/45 to-yellow-900/55',
    descriptionKey: 'pages.gameModeSelect.classic.description',
    icon: Swords,
    image: classicBg,
    labelKey: 'pages.gameModeSelect.classic.title',
    path: '/classic',
    cards: [card1Espada8Bit, card12Copas8Bit, card3Paus8Bit],
    statusKey: 'pages.gameModeSelect.classic.status',
    statusClass: 'border-emerald-400/35 bg-emerald-950/90 text-emerald-300',
  },
  {
    accentClass: 'from-red-950/80 via-black/55 to-stone-950/80',
    descriptionKey: 'pages.gameModeSelect.hellHand.description',
    icon: Flame,
    image: hellHandBg,
    labelKey: 'pages.gameModeSelect.hellHand.title',
    path: '/hell-hand',
    statusKey: 'pages.gameModeSelect.hellHand.status',
    statusClass: 'border-stone-400/30 bg-stone-800/90 text-stone-300',
  },
];

function ModeCard({ mode, t }) {
  const Icon = mode.icon;

  return (
    <Link
      to={mode.path}
      className="group relative flex min-h-[18rem] overflow-hidden rounded-lg border border-white/12 bg-black text-white shadow-2xl shadow-black/30 outline-none transition duration-300 hover:-translate-y-1 hover:border-amber-300/50 hover:shadow-amber-950/30 focus-visible:ring-2 focus-visible:ring-amber-300 md:min-h-[24rem]"
    >
      <img
        src={mode.image}
        alt=""
        className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
        draggable="false"
      />
      <div className={cn('absolute inset-0 bg-gradient-to-br', mode.accentClass)} />
      {mode.cards ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[30%] h-32 w-44 -translate-x-1/2 -translate-y-1/2 transition duration-500 group-hover:scale-105 md:top-[34%] md:h-40 md:w-56"
        >
          {mode.cards.map((card, index) => (
            <img
              key={card}
              src={card}
              alt=""
              draggable="false"
              className={cn(
                'absolute w-auto rounded shadow-2xl shadow-black/70 [image-rendering:pixelated]',
                index === 0 && 'left-2 top-4 z-10 h-24 -rotate-[14deg] md:h-32',
                index === 1 && 'right-2 top-4 z-10 h-24 rotate-[14deg] md:h-32',
                index === 2 && 'left-1/2 top-0 z-20 h-28 -translate-x-1/2 md:h-36',
              )}
            />
          ))}
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="relative z-10 flex min-h-full w-full flex-col justify-between p-5 sm:p-6">
        <span className="grid size-11 place-items-center rounded-md border border-white/15 bg-black/45 text-amber-200 backdrop-blur">
          <Icon className="size-5" />
        </span>

        <span>
          <span className="block text-3xl font-black tracking-tight md:text-5xl">
            {t(mode.labelKey)}
          </span>
          <span className="mt-3 block max-w-md text-sm font-semibold leading-6 text-white/72 md:text-base md:leading-7">
            {t(mode.descriptionKey)}
          </span>
          <span className="mt-4 flex justify-end">
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold backdrop-blur',
                mode.statusClass,
              )}
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
              {t(mode.statusKey)}
            </span>
          </span>
        </span>
      </div>
    </Link>
  );
}

export function GameModeSelect() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300/80">
            {t('pages.gameModeSelect.eyebrow')}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
            {t('pages.gameModeSelect.title')}
          </h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {gameModes.map((mode) => (
            <ModeCard key={mode.path} mode={mode} t={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
