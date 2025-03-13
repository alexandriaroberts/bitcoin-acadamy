'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

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
      from: '1A2b3C4d5E6f...',
      to: '8X9y7Z6w5V4u...',
      amount: '0.05 BTC',
      signature: '3045022100a1b2c3d4...',
      isValid: true,
    },
    {
      id: 'tx2',
      from: '7G8h9I0j1K2l...',
      to: '3T2s1R0q9P8o...',
      amount: '1.25 BTC',
      signature: '3046022100d4c3b2a1...',
      isValid: false,
      reason:
        "The signature was created with a different private key than the one associated with the sender's address.",
    },
    {
      id: 'tx3',
      from: '4M5n6O7p8Q9r...',
      to: '7W6v5U4t3S2r...',
      amount: '0.1 BTC',
      signature: '3045022100e5f6g7h8...',
      isValid: true,
    },
  ];

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
        <h4 className='font-bold text-lg mb-6'>Examine these transactions:</h4>

        <RadioGroup
          value={selectedTransaction || ''}
          onValueChange={setSelectedTransaction}
        >
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
                  <RadioGroupItem
                    value={transaction.id}
                    id={transaction.id}
                    className='mt-1'
                    disabled={isSubmitted}
                  />
                  <div className='ml-3 flex-1'>
                    <div className='flex justify-between'>
                      <Label htmlFor={transaction.id} className='font-medium'>
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
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-2'>
                      <div>
                        <p className='text-xs text-slate-400'>From:</p>
                        <p className='text-sm'>{transaction.from}</p>
                      </div>
                      <div>
                        <p className='text-xs text-slate-400'>To:</p>
                        <p className='text-sm'>{transaction.to}</p>
                      </div>
                      <div>
                        <p className='text-xs text-slate-400'>Amount:</p>
                        <p className='text-sm'>{transaction.amount}</p>
                      </div>
                      <div>
                        <p className='text-xs text-slate-400'>Signature:</p>
                        <p className='text-sm'>{transaction.signature}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>

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
              <AlertTriangle className='h-5 w-5 text-yellow-500 mr-2 mt-0.5' />
              <div>
                <p className='font-medium'>
                  Transaction 2 has an invalid signature
                </p>
                <p className='text-sm mt-1'>{transactions[1].reason}</p>
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
