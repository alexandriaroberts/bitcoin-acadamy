import { TutorialModule } from '@/components/tutorial-module';

export default function Home() {
  return (
    <main className='min-h-screen bg-slate-900 text-white p-8'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-2 text-orange-500'>
          Bitcoin Academy
        </h1>
        <h2 className='text-2xl font-semibold text-center mb-8 text-green-400'>
          Module 1: Digital Signatures & Ownership
        </h2>

        <TutorialModule />
      </div>
    </main>
  );
}
