import { TutorialModule } from '@/components/tutorial-module';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { BitcoinLogo2D } from '@/components/2d/bitcoin-logo';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white'>
      <AnimatedBackground />
      <div className='container mx-auto px-4 py-12'>
        <div className='flex flex-col items-center mb-12'>
          <BitcoinLogo2D />
          <h1 className='text-5xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500'>
            Bitcoin School
          </h1>
          <h2 className='text-2xl font-semibold text-center mb-8 text-green-400'>
            Module 1: Digital Signatures & Ownership
          </h2>
        </div>

        <TutorialModule />
      </div>
    </main>
  );
}
