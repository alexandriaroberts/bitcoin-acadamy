'use client';

import { useState } from 'react';
import { KeyGenerationStation } from './stations/key-generation-station';
import { TransactionSigningChamber } from './stations/transaction-signing-chamber';
import { VerificationPortal } from './stations/verification-portal';
import { SpotInvalidTransaction } from './stations/spot-invalid-transaction';
import { ProgressBar } from './ui/progress-bar';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

type KeyPair = {
  privateKey: string;
  publicKey: string;
};

type Station =
  | 'intro'
  | 'key-generation'
  | 'transaction-signing'
  | 'verification'
  | 'challenge'
  | 'complete';

export function TutorialModule() {
  const [currentStation, setCurrentStation] = useState<Station>('intro');
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [transactionSigned, setTransactionSigned] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [challengeComplete, setChallengeComplete] = useState(false);

  const progress = {
    intro: 0,
    'key-generation': 20,
    'transaction-signing': 40,
    verification: 60,
    challenge: 80,
    complete: 100,
  };

  const handleNext = () => {
    const stations: Station[] = [
      'intro',
      'key-generation',
      'transaction-signing',
      'verification',
      'challenge',
      'complete',
    ];
    const currentIndex = stations.indexOf(currentStation);
    if (currentIndex < stations.length - 1) {
      setCurrentStation(stations[currentIndex + 1]);
    }
  };

  const canProceed = () => {
    switch (currentStation) {
      case 'intro':
        return true;
      case 'key-generation':
        return !!keyPair;
      case 'transaction-signing':
        return transactionSigned;
      case 'verification':
        return verificationComplete;
      case 'challenge':
        return challengeComplete;
      default:
        return false;
    }
  };

  return (
    <div className='bg-slate-800 rounded-lg shadow-xl overflow-hidden'>
      <div className='p-6'>
        <ProgressBar value={progress[currentStation]} />

        <div className='mt-6'>
          {currentStation === 'intro' && (
            <div className='space-y-4'>
              <h3 className='text-2xl font-bold'>
                Welcome to Module 1: Digital Signatures & Ownership
              </h3>
              <p className='text-lg'>
                In this module, you'll learn how Bitcoin uses cryptography to
                prove ownership and authorize transactions without requiring a
                central authority.
              </p>
              <p className='text-lg'>
                You'll generate cryptographic keys, sign transactions, verify
                signatures, and test your knowledge with a challenge.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
                <div className='bg-slate-700 p-4 rounded-lg'>
                  <h4 className='font-bold text-yellow-400 mb-2'>
                    What you'll learn:
                  </h4>
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>How private and public keys work together</li>
                    <li>How digital signatures prove ownership</li>
                    <li>Why Bitcoin doesn't need a central authority</li>
                    <li>How to spot invalid transactions</li>
                  </ul>
                </div>
                <div className='bg-slate-700 p-4 rounded-lg'>
                  <h4 className='font-bold text-yellow-400 mb-2'>
                    Why this matters:
                  </h4>
                  <p>
                    Understanding cryptographic ownership is fundamental to
                    Bitcoin and all cryptocurrencies. This is how you can truly
                    "own" digital assets without relying on banks or other
                    institutions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStation === 'key-generation' && (
            <KeyGenerationStation onKeysGenerated={setKeyPair} />
          )}

          {currentStation === 'transaction-signing' && keyPair && (
            <TransactionSigningChamber
              privateKey={keyPair.privateKey}
              publicKey={keyPair.publicKey}
              onTransactionSigned={() => setTransactionSigned(true)}
            />
          )}

          {currentStation === 'verification' && (
            <VerificationPortal
              onVerificationComplete={() => setVerificationComplete(true)}
            />
          )}

          {currentStation === 'challenge' && (
            <SpotInvalidTransaction
              onChallengeComplete={() => setChallengeComplete(true)}
            />
          )}

          {currentStation === 'complete' && (
            <div className='text-center space-y-6 py-8'>
              <div className='flex justify-center'>
                <div className='bg-green-600 rounded-full p-4 inline-block'>
                  <CheckCircle2 className='h-16 w-16 text-white' />
                </div>
              </div>
              <h3 className='text-2xl font-bold'>Congratulations!</h3>
              <p className='text-lg'>
                You've completed Module 1: Digital Signatures & Ownership
              </p>
              <div className='bg-slate-700 p-6 rounded-lg max-w-2xl mx-auto mt-6'>
                <h4 className='font-bold text-xl mb-4'>Key Takeaways:</h4>
                <ul className='text-left space-y-3'>
                  <li className='flex items-start'>
                    <span className='text-yellow-400 mr-2'>•</span>
                    <span>
                      Your <strong>private key</strong> is your secret that
                      proves ownership and should never be shared.
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <span className='text-yellow-400 mr-2'>•</span>
                    <span>
                      Your <strong>public key</strong> can be safely shared and
                      is used to verify your signatures.
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <span className='text-yellow-400 mr-2'>•</span>
                    <span>
                      <strong>Digital signatures</strong> prove you authorized a
                      transaction without revealing your private key.
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <span className='text-yellow-400 mr-2'>•</span>
                    <span>
                      This system allows Bitcoin to operate{' '}
                      <strong>without central authorities</strong> because
                      ownership and authorization can be mathematically verified
                      by anyone.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {currentStation !== 'complete' && (
          <div className='mt-8 flex justify-end'>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold'
            >
              {canProceed() ? 'Continue' : 'Complete this section to continue'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
