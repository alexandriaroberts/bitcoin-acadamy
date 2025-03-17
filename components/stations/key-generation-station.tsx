'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Key, Lock, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BitcoinLogo } from '../2d/bitcoin-logo';

interface KeyGenerationStationProps {
  onKeysGenerated: (keyPair: { privateKey: string; publicKey: string }) => void;
}

export function KeyGenerationStation({
  onKeysGenerated,
}: KeyGenerationStationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [keyPair, setKeyPair] = useState<{
    privateKey: string;
    publicKey: string;
  } | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const generateKeyPair = () => {
    setIsGenerating(true);

    // Simulate key generation with a delay
    setTimeout(() => {
      // In a real implementation, we would use actual cryptographic functions
      // This is a simplified representation for educational purposes
      const newKeyPair = {
        privateKey:
          'ef3c071f4330cc0d...' + Math.random().toString(16).substring(2, 6),
        publicKey:
          '02a1f56716cb8df7...' + Math.random().toString(16).substring(2, 6),
      };

      setKeyPair(newKeyPair);
      onKeysGenerated(newKeyPair);
      setIsGenerating(false);
      setShowExplanation(true);
    }, 1500);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-2xl font-bold mb-2'>Key Generation Station</h3>
          <p className='text-lg'>
            Bitcoin uses a pair of cryptographic keys to establish ownership.
            Let's generate your own key pair!
          </p>
        </div>
        <div className='w-24 h-24'>
          <BitcoinLogo />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6'>
        <Card className='p-6 bg-slate-700 border-none'>
          <div className='flex items-center mb-4'>
            <Key className='h-6 w-6 text-yellow-400 mr-2' />
            <h4 className='font-bold text-lg'>Private Key</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='ml-2 p-0 h-6 w-6'
                  >
                    <Info className='h-4 w-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='max-w-xs'>
                    Your private key must be kept secret. Anyone with your
                    private key can spend your bitcoin.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='bg-slate-800 p-4 rounded-md h-32 flex items-center justify-center'>
            {keyPair ? (
              <div className='text-center'>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Key className='h-12 w-12 text-yellow-400 mx-auto mb-2' />
                </motion.div>
                <code className='text-xs text-yellow-400 break-all'>
                  {keyPair.privateKey}
                </code>
              </div>
            ) : (
              <p className='text-slate-400 text-center'>
                Your private key will appear here
              </p>
            )}
          </div>
          <p className='mt-4 text-sm'>
            Think of your private key as a secret password that unlocks your
            bitcoin. Never share it with anyone!
          </p>
        </Card>

        <Card className='p-6 bg-slate-700 border-none'>
          <div className='flex items-center mb-4'>
            <Lock className='h-6 w-6 text-green-400 mr-2' />
            <h4 className='font-bold text-lg'>Public Key</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='ml-2 p-0 h-6 w-6'
                  >
                    <Info className='h-4 w-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='max-w-xs'>
                    Your public key can be safely shared. It's used to verify
                    signatures and generate addresses.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='bg-slate-800 p-4 rounded-md h-32 flex items-center justify-center'>
            {keyPair ? (
              <div className='text-center'>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Lock className='h-12 w-12 text-green-400 mx-auto mb-2' />
                </motion.div>
                <code className='text-xs text-green-400 break-all'>
                  {keyPair.publicKey}
                </code>
              </div>
            ) : (
              <p className='text-slate-400 text-center'>
                Your public key will appear here
              </p>
            )}
          </div>
          <p className='mt-4 text-sm'>
            Your public key is derived from your private key and can be safely
            shared with others.
          </p>
        </Card>
      </div>

      {!keyPair && (
        <div className='flex justify-center mt-8'>
          <Button
            onClick={generateKeyPair}
            disabled={isGenerating}
            className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold'
          >
            {isGenerating ? 'Generating...' : 'Generate Key Pair'}
          </Button>
        </div>
      )}

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-slate-700 p-6 rounded-lg mt-8'
        >
          <h4 className='font-bold text-lg mb-4'>How Key Pairs Work</h4>

          <div className='flex items-center justify-center mb-6'>
            <div className='text-center'>
              <Key className='h-10 w-10 text-yellow-400 mx-auto' />
              <p className='mt-2 font-bold'>Private Key</p>
            </div>
            <ArrowRight className='mx-6 text-yellow-400' />
            <div className='text-center'>
              <Lock className='h-10 w-10 text-green-400 mx-auto' />
              <p className='mt-2 font-bold'>Public Key</p>
            </div>
          </div>

          <ul className='space-y-3'>
            <li className='flex items-start'>
              <span className='text-yellow-400 mr-2'>•</span>
              <span>
                Your private key is generated using secure random numbers.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-400 mr-2'>•</span>
              <span>
                Your public key is mathematically derived from your private key
                using elliptic curve cryptography.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-400 mr-2'>•</span>
              <span>
                It's computationally impossible to reverse the process and
                derive the private key from the public key.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-400 mr-2'>•</span>
              <span>
                In Bitcoin, your public key is hashed to create your Bitcoin
                address.
              </span>
            </li>
          </ul>

          <div className='mt-6 bg-slate-800 p-4 rounded-md'>
            <p className='text-sm italic'>
              <strong>Important:</strong> In a real Bitcoin wallet, your private
              key would be used to generate a 12 or 24-word recovery phrase.
              This phrase is easier to back up than the raw private key, but
              serves the same purpose.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
