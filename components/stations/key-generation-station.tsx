'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Key, Lock, ArrowRight, Info, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='space-y-8'
    >
      <div>
        <h3 className='text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500'>
          Key Generation Station
        </h3>
        <p className='text-lg text-slate-300'>
          Bitcoin uses a pair of cryptographic keys to establish ownership.
          Let's generate your own key pair!
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className='p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl rounded-xl overflow-hidden'>
            <div className='flex items-center mb-4'>
              <div className='bg-orange-500/20 p-2 rounded-lg mr-3'>
                <Key className='h-6 w-6 text-orange-500' />
              </div>
              <h4 className='font-bold text-lg text-orange-500'>Private Key</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='ml-2 p-0 h-6 w-6 text-slate-400'
                    >
                      <Info className='h-4 w-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-slate-800 border-slate-700'>
                    <p className='max-w-xs'>
                      Your private key must be kept secret. Anyone with your
                      private key can spend your bitcoin.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='bg-slate-900 p-6 rounded-xl h-40 flex items-center justify-center border border-slate-800'>
              {keyPair ? (
                <div className='text-center'>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <Key className='h-16 w-16 text-orange-500 mx-auto mb-4' />
                  </motion.div>
                  <code className='text-sm text-orange-400 break-all bg-slate-800 p-2 rounded-md'>
                    {keyPair.privateKey}
                  </code>
                </div>
              ) : (
                <div className='text-center'>
                  <Shield className='h-16 w-16 text-slate-700 mx-auto mb-2' />
                  <p className='text-slate-500'>
                    Your private key will appear here
                  </p>
                </div>
              )}
            </div>
            <p className='mt-4 text-sm text-slate-400'>
              Think of your private key as a secret password that unlocks your
              bitcoin. Never share it with anyone!
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className='p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl rounded-xl overflow-hidden'>
            <div className='flex items-center mb-4'>
              <div className='bg-green-500/20 p-2 rounded-lg mr-3'>
                <Lock className='h-6 w-6 text-green-500' />
              </div>
              <h4 className='font-bold text-lg text-green-500'>Public Key</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='ml-2 p-0 h-6 w-6 text-slate-400'
                    >
                      <Info className='h-4 w-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-slate-800 border-slate-700'>
                    <p className='max-w-xs'>
                      Your public key can be safely shared. It's used to verify
                      signatures and generate addresses.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='bg-slate-900 p-6 rounded-xl h-40 flex items-center justify-center border border-slate-800'>
              {keyPair ? (
                <div className='text-center'>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                  >
                    <Lock className='h-16 w-16 text-green-500 mx-auto mb-4' />
                  </motion.div>
                  <code className='text-sm text-green-400 break-all bg-slate-800 p-2 rounded-md'>
                    {keyPair.publicKey}
                  </code>
                </div>
              ) : (
                <div className='text-center'>
                  <Shield className='h-16 w-16 text-slate-700 mx-auto mb-2' />
                  <p className='text-slate-500'>
                    Your public key will appear here
                  </p>
                </div>
              )}
            </div>
            <p className='mt-4 text-sm text-slate-400'>
              Your public key is derived from your private key and can be safely
              shared with others.
            </p>
          </Card>
        </motion.div>
      </div>

      {!keyPair && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='flex justify-center mt-10'
        >
          <Button
            onClick={generateKeyPair}
            disabled={isGenerating}
            className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg text-lg'
          >
            {isGenerating ? (
              <div className='flex items-center'>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='mr-2'
                >
                  <Shield className='h-5 w-5' />
                </motion.div>
                Generating...
              </div>
            ) : (
              <div className='flex items-center'>
                <Shield className='mr-2 h-5 w-5' />
                Generate Key Pair
              </div>
            )}
          </Button>
        </motion.div>
      )}

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl mt-10 border border-slate-700 shadow-xl'
        >
          <h4 className='font-bold text-xl mb-6 text-orange-500'>
            How Key Pairs Work
          </h4>

          <div className='flex flex-col md:flex-row items-center justify-center mb-8 space-y-6 md:space-y-0'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-center'
            >
              <div className='bg-orange-500/20 p-4 rounded-xl'>
                <Key className='h-12 w-12 text-orange-500 mx-auto' />
                <p className='mt-3 font-bold text-orange-500'>Private Key</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='mx-6'
            >
              <ArrowRight className='text-orange-500 h-8 w-8' />
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className='text-center'
            >
              <div className='bg-green-500/20 p-4 rounded-xl'>
                <Lock className='h-12 w-12 text-green-500 mx-auto' />
                <p className='mt-3 font-bold text-green-500'>Public Key</p>
              </div>
            </motion.div>
          </div>

          <ul className='space-y-4'>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className='flex items-start'
            >
              <span className='text-orange-500 mr-3 text-xl'>•</span>
              <span className='text-slate-300'>
                Your private key is generated using secure random numbers.
              </span>
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className='flex items-start'
            >
              <span className='text-orange-500 mr-3 text-xl'>•</span>
              <span className='text-slate-300'>
                Your public key is mathematically derived from your private key
                using elliptic curve cryptography.
              </span>
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className='flex items-start'
            >
              <span className='text-orange-500 mr-3 text-xl'>•</span>
              <span className='text-slate-300'>
                It's computationally impossible to reverse the process and
                derive the private key from the public key.
              </span>
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              className='flex items-start'
            >
              <span className='text-orange-500 mr-3 text-xl'>•</span>
              <span className='text-slate-300'>
                In Bitcoin, your public key is hashed to create your Bitcoin
                address.
              </span>
            </motion.li>
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className='mt-8 bg-slate-900 p-5 rounded-xl border border-slate-800'
          >
            <p className='text-sm italic text-slate-400'>
              <strong className='text-orange-500'>Important:</strong> In a real
              Bitcoin wallet, your private key would be used to generate a 12 or
              24-word recovery phrase. This phrase is easier to back up than the
              raw private key, but serves the same purpose.
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
