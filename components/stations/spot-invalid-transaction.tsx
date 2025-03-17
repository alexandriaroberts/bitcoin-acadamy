'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  signature: string;
  isValid: boolean;
  reason?: string;
}

interface SpotInvalidTransactionProps {
  onChallengeComplete: () => void;
}

export function SpotInvalidTransaction({
  onChallengeComplete,
}: SpotInvalidTransactionProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const transactions: Transaction[] = [
    {
      id: 'tx1',
      from: '1A2b3C4d5E6f7G8h9I0jK1lM2nO3pQ4rS5tU6vW7xY8z',
      to: '8X9y7Z6w5V4u3T2s1R0qP9o8N7m6L5k4J3h2G1f0E9d8',
      amount: '0.05 BTC',
      signature:
        '3045022100a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z',
      isValid: true,
    },
    {
      id: 'tx2',
      from: '7G8h9I0j1K2l3M4n5O6p7Q8r9S0t1U2v3W4x5Y6z7A8b',
      to: '3T2s1R0q9P8o7N6m5L4k3J2h1G0f9E8d7C6b5A4z3X2w',
      amount: '1.25 BTC',
      // This signature has a different prefix (3046 instead of 3045) and structure
      signature: '3046022100d4c3b2a1z0y9x8w7v6u5t4s3r2q1p0o9n8m7l6k5j4h3g2f1e',
      isValid: false,
      reason:
        "The signature format is incorrect. Valid Bitcoin signatures start with '3045', but this one starts with '3046'. Additionally, the signature structure doesn't match what would be produced by the sender's private key.",
    },
    {
      id: 'tx3',
      from: '4M5n6O7p8Q9r0S1t2U3v4W5x6Y7z8A9b0C1d2E3f4G5h',
      to: '7W6v5U4t3S2r1Q0p9O8n7M6l5K4j3H2g1F0e9D8c7B6a',
      amount: '0.1 BTC',
      signature: '3045022100e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c',
      isValid: true,
    },
  ];

  const highlightSignatureFormat = (signature: string) => {
    if (signature.startsWith('3045')) {
      return (
        <span>
          <span className='text-green-400'>3045</span>
          {signature.substring(4)}
        </span>
      );
    } else if (signature.startsWith('3046')) {
      return (
        <span>
          <span className='text-red-400'>3046</span>
          {signature.substring(4)}
        </span>
      );
    }
    return signature;
  };

  const handleSubmit = () => {
    if (!selectedTransaction) return;

    const selectedTx = transactions.find((tx) => tx.id === selectedTransaction);
    setIsSubmitted(true);
    setIsCorrect(!selectedTx?.isValid);
    setShowExplanation(true);

    if (!selectedTx?.isValid) {
      onChallengeComplete();
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-2xl font-bold mb-2'>
          Challenge: Spot the Invalid Transaction
        </h3>
        <p className='text-lg'>
          Now that you understand how signatures work, can you identify which of
          these transactions has an invalid signature?
        </p>
      </div>

      <div className='bg-slate-700 p-6 rounded-lg mt-6'>
        <div className='flex items-center mb-6'>
          <h4 className='font-bold text-lg'>Examine these transactions:</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='sm' className='ml-2 p-0 h-6 w-6'>
                  <Info className='h-4 w-4 text-blue-400' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className='max-w-xs'>
                  Look carefully at the signature format. Valid Bitcoin
                  signatures start with "3045". An invalid signature might have
                  a different prefix or structure that doesn't match the
                  sender's key.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Replace the RadioGroup with standard radio inputs */}
        <div className='space-y-4'>
          {transactions.map((transaction) => (
            <Card
              key={transaction.id}
              className={`p-4 border-2 ${
                isSubmitted && selectedTransaction === transaction.id
                  ? transaction.isValid
                    ? 'border-red-500 bg-red-900/10'
                    : 'border-green-500 bg-green-900/10'
                  : 'border-slate-600 bg-slate-800'
              }`}
            >
              <div className='flex items-start'>
                <input
                  type='radio'
                  id={transaction.id}
                  name='transaction'
                  value={transaction.id}
                  checked={selectedTransaction === transaction.id}
                  onChange={() => setSelectedTransaction(transaction.id)}
                  disabled={isSubmitted}
                  className='mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-slate-600'
                />
                <div className='ml-3 flex-1'>
                  <div className='flex justify-between'>
                    <Label
                      htmlFor={transaction.id}
                      className='font-medium text-lg'
                    >
                      Transaction {transaction.id.replace('tx', '')}
                    </Label>
                    {isSubmitted &&
                      selectedTransaction === transaction.id &&
                      (transaction.isValid ? (
                        <XCircle className='h-5 w-5 text-red-500' />
                      ) : (
                        <CheckCircle className='h-5 w-5 text-green-500' />
                      ))}
                  </div>
                  <div className='grid grid-cols-1 gap-2 mt-2'>
                    <div className='bg-slate-900/50 p-3 rounded-md'>
                      <p className='text-xs text-slate-400 mb-1'>From:</p>
                      <p className='text-sm font-mono break-all'>
                        {transaction.from}
                      </p>
                    </div>
                    <div className='bg-slate-900/50 p-3 rounded-md'>
                      <p className='text-xs text-slate-400 mb-1'>To:</p>
                      <p className='text-sm font-mono break-all'>
                        {transaction.to}
                      </p>
                    </div>
                    <div className='bg-slate-900/50 p-3 rounded-md'>
                      <p className='text-xs text-slate-400 mb-1'>Amount:</p>
                      <p className='text-sm font-mono'>{transaction.amount}</p>
                    </div>
                    <div className='bg-slate-900/50 p-3 rounded-md'>
                      <p className='text-xs text-slate-400 mb-1'>Signature:</p>
                      <p className='text-sm font-mono break-all'>
                        {highlightSignatureFormat(transaction.signature)}
                        {!transaction.isValid && (
                          <span className='ml-2 text-xs bg-red-900/50 text-red-400 px-2 py-0.5 rounded'>
                            Invalid Format
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!isSubmitted && (
          <div className='flex justify-center mt-6'>
            <Button
              onClick={handleSubmit}
              disabled={!selectedTransaction}
              className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold'
            >
              Submit Answer
            </Button>
          </div>
        )}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-lg mt-8 ${
            isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'
          }`}
        >
          <div className='flex items-center mb-4'>
            {isCorrect ? (
              <>
                <CheckCircle className='h-6 w-6 text-green-500 mr-2' />
                <h4 className='font-bold text-lg text-green-500'>Correct!</h4>
              </>
            ) : (
              <>
                <XCircle className='h-6 w-6 text-red-500 mr-2' />
                <h4 className='font-bold text-lg text-red-500'>
                  Not quite right
                </h4>
              </>
            )}
          </div>

          <div className='bg-slate-800 p-4 rounded-md mb-4'>
            <div className='flex items-start'>
              <AlertTriangle className='h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium'>
                  Transaction 2 has an invalid signature
                </p>
                <p className='text-sm mt-1'>{transactions[1].reason}</p>
                <div className='mt-3 p-3 bg-slate-900 rounded-md'>
                  <p className='text-xs text-slate-400 mb-1'>
                    Valid Signature Format (Transactions 1 & 3):
                  </p>
                  <p className='text-sm font-mono break-all'>
                    <span className='text-green-400'>3045</span>022100...
                  </p>

                  <p className='text-xs text-slate-400 mt-2 mb-1'>
                    Invalid Signature in Transaction 2:
                  </p>
                  <p className='text-sm font-mono break-all'>
                    <span className='text-red-400'>3046</span>022100...
                  </p>

                  <p className='text-xs text-slate-400 mt-3'>
                    In a real Bitcoin transaction, nodes would verify that:
                  </p>
                  <ol className='text-xs text-slate-300 list-decimal ml-5 mt-1 space-y-1'>
                    <li>The signature has the correct format</li>
                    <li>
                      The signature was mathematically created using the private
                      key associated with the sender's address
                    </li>
                    <li>
                      The signature correctly signs the exact transaction data
                      (sender, recipient, amount)
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <h5 className='font-medium mb-3'>
            How Bitcoin Protects Against Invalid Signatures:
          </h5>
          <ul className='space-y-2'>
            <li className='flex items-start'>
              <span className='text-yellow-400 mr-2'>•</span>
              <span>
                Every node in the network independently verifies all transaction
                signatures.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-400 mr-2'>•</span>
              <span>
                Invalid transactions are rejected and never added to the
                blockchain.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-400 mr-2'>•</span>
              <span>
                This prevents anyone from spending bitcoin they don't own.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-400 mr-2'>•</span>
              <span>
                The system is trustless - you don't need to trust any individual
                node because the math proves ownership.
              </span>
            </li>
          </ul>

          {!isCorrect && (
            <div className='mt-6'>
              <Button
                onClick={() => {
                  setSelectedTransaction('tx2');
                  setIsSubmitted(true);
                  setIsCorrect(true);
                  onChallengeComplete();
                }}
                className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold'
              >
                Try Again
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
