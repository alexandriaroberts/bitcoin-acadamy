'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BitcoinLogo } from '../2d/bitcoin-logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { TooltipProvider } from '@/components/ui/tooltip';

interface TransactionSigningChamberProps {
  privateKey: string;
  publicKey: string;
  onTransactionSigned: () => void;
}

export function TransactionSigningChamber({
  privateKey,
  publicKey,
  onTransactionSigned,
}: TransactionSigningChamberProps) {
  const [isSigning, setIsSigning] = useState(false);
  const [isSigningComplete, setIsSigningComplete] = useState(false);
  const [signature, setSignature] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'privateKey');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const data = e.dataTransfer.getData('text/plain');
    if (data === 'privateKey') {
      signTransaction();
    }
  };

  const signTransaction = () => {
    setIsSigning(true);

    setTimeout(() => {
      const newSignature =
        '3045022100f4b...' + Math.random().toString(16).substring(2, 10);
      setSignature(newSignature);
      setIsSigning(false);
      setIsSigningComplete(true);
      setShowExplanation(true);
      onTransactionSigned();
    }, 1500);
  };

  return (
    <TooltipProvider>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-3xl font-bold mb-2 text-orange-500'>
              Transaction Signing Chamber
            </h3>
            <p className='text-xl text-green-400'>
              Use your private key to sign a transaction.
            </p>
          </div>
          <div className='w-40 h-40 flex items-center justify-center'>
            <BitcoinLogo />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className='bg-gradient-to-br from-orange-500 to-yellow-500 text-white'>
              <div className='p-6'>
                <h4 className='font-bold text-xl mb-4'>Your Private Key</h4>
                <div
                  className='bg-white/10 p-4 rounded-md cursor-grab backdrop-blur-sm'
                  draggable
                  onDragStart={handleDragStart}
                >
                  <div className='text-center'>
                    <code className='text-sm break-all'>{privateKey}</code>
                  </div>
                </div>
                <p className='mt-4 text-sm text-center font-medium'>
                  Drag your private key to sign the transaction
                </p>
              </div>
            </Card>
          </motion.div>

          <Card className='bg-gradient-to-br from-green-500 to-emerald-600 text-white lg:col-span-2'>
            <div className='p-6'>
              <h4 className='font-bold text-xl mb-4'>Transaction Details</h4>

              <div className='space-y-4'>
                <div>
                  <Label className='text-white'>From</Label>
                  <input
                    value='Your Bitcoin Address (1A2b3C...)'
                    readOnly
                    className='w-full bg-white/10 border-white/20 text-white rounded p-2'
                  />
                </div>

                <div>
                  <Label className='text-white'>To</Label>
                  <input
                    value='Coffee Shop (8X9y7Z...)'
                    readOnly
                    className='w-full bg-white/10 border-white/20 text-white rounded p-2'
                  />
                </div>

                <div>
                  <Label className='text-white'>Amount</Label>
                  <input
                    value='0.001 BTC'
                    readOnly
                    className='w-full bg-white/10 border-white/20 text-white rounded p-2'
                  />
                </div>
              </div>

              <motion.div
                className={`mt-6 p-4 rounded-md border-2 border-dashed flex flex-col items-center justify-center h-32 transition-colors ${
                  isDragging
                    ? 'border-white bg-white/20'
                    : isSigningComplete
                    ? 'border-white bg-white/30'
                    : 'border-white/50 bg-white/10'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isSigningComplete ? (
                  <div className='text-center'>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <svg
                        className='w-12 h-12 text-green-400 mx-auto'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </motion.div>
                    <p className='font-medium mt-2'>Transaction Signed!</p>
                    <code className='text-xs break-all mt-2 block'>
                      {signature}
                    </code>
                  </div>
                ) : isSigning ? (
                  <div className='text-center'>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'linear',
                      }}
                    >
                      <svg
                        className='w-12 h-12 text-orange-400 mx-auto'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        />
                      </svg>
                    </motion.div>
                    <p className='mt-2'>Signing Transaction...</p>
                  </div>
                ) : (
                  <div className='text-center'>
                    <svg
                      className='w-12 h-12 text-white/50 mx-auto'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      />
                    </svg>
                    <p className='mt-2'>Drop Private Key Here to Sign</p>
                  </div>
                )}
              </motion.div>
            </div>
          </Card>
        </div>

        {!isSigningComplete && (
          <div className='flex justify-center mt-4'>
            <Button onClick={signTransaction} disabled={isSigning}>
              {isSigning ? 'Signing...' : 'Sign Transaction'}
            </Button>
          </div>
        )}

        {showExplanation && (
          <Card className='bg-gradient-to-br from-slate-800 to-slate-900 text-white mt-8 border border-orange-500/20'>
            <div className='p-6'>
              <h4 className='font-bold text-lg mb-4 text-orange-400'>
                How Transaction Signing Works
              </h4>
              <ul className='space-y-3 text-sm'>
                <li className='flex items-start'>
                  <span className='text-orange-400 mr-2'>•</span>
                  <span>
                    The transaction data (sender, recipient, amount) is hashed
                    using SHA-256.
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-orange-400 mr-2'>•</span>
                  <span>
                    Your private key is used to create a unique signature for
                    this hash.
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-orange-400 mr-2'>•</span>
                  <span>
                    The signature proves you authorized this specific
                    transaction without revealing your private key.
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-orange-400 mr-2'>•</span>
                  <span>
                    The signature is mathematically linked to both the
                    transaction data and your key pair.
                  </span>
                </li>
              </ul>
              <div className='mt-6 bg-slate-700 p-4 rounded-md border border-green-500/20'>
                <p className='text-sm italic text-green-400'>
                  <strong>Security Note:</strong> Even if someone intercepts
                  your signed transaction, they cannot modify it or create new
                  transactions because they don't have your private key.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
