'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FileSignature,
  Lock,
  CheckCircle,
  XCircle,
  Network,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface VerificationPortalProps {
  onVerificationComplete: () => void;
}

export function VerificationPortal({
  onVerificationComplete,
}: VerificationPortalProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [nodeStatuses, setNodeStatuses] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showExplanation, setShowExplanation] = useState(false);

  const startVerification = () => {
    setIsVerifying(true);
    setNodeStatuses([false, false, false, false, false]);

    // Simulate nodes verifying one by one
    const verifyNode = (index: number) => {
      if (index >= nodeStatuses.length) {
        setIsVerifying(false);
        setVerificationComplete(true);
        setShowExplanation(true);
        onVerificationComplete();
        return;
      }

      setTimeout(() => {
        setNodeStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[index] = true;
          return newStatuses;
        });
        verifyNode(index + 1);
      }, 600);
    };

    // Start the verification process after a short delay
    setTimeout(() => verifyNode(0), 500);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-2xl font-bold mb-2'>Verification Portal</h3>
        <p className='text-lg'>
          Now let's see how the Bitcoin network verifies your transaction
          signature without needing a central authority.
        </p>
      </div>

      <div className='bg-slate-700 p-6 rounded-lg mt-6'>
        <h4 className='font-bold text-lg mb-4 flex items-center'>
          <Network className='h-5 w-5 text-blue-400 mr-2' />
          Bitcoin Network Verification
        </h4>

        <div className='flex flex-wrap justify-center gap-4 my-6'>
          {nodeStatuses.map((verified, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{
                scale: verified ? 1 : 0.9,
                opacity: verified ? 1 : 0.7,
              }}
              className={`relative p-4 rounded-lg ${
                verified ? 'bg-green-900/30' : 'bg-slate-800'
              }`}
            >
              <div className='h-16 w-16 flex items-center justify-center'>
                <Network
                  className={`h-10 w-10 ${
                    verified ? 'text-green-400' : 'text-slate-500'
                  }`}
                />
                {verified && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className='absolute top-2 right-2'
                  >
                    <CheckCircle className='h-5 w-5 text-green-400' />
                  </motion.div>
                )}
              </div>
              <p className='text-center text-sm mt-2'>Node {index + 1}</p>
            </motion.div>
          ))}
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center gap-4 mb-6'>
          <Card className='p-4 bg-slate-800 border-none w-full md:w-auto'>
            <div className='flex items-center'>
              <Lock className='h-5 w-5 text-green-400 mr-2' />
              <h5 className='font-medium'>Public Key</h5>
            </div>
            <p className='text-xs text-slate-400 mt-2'>02a1f56716cb8df7...</p>
          </Card>

          <span className='text-slate-400'>+</span>

          <Card className='p-4 bg-slate-800 border-none w-full md:w-auto'>
            <div className='flex items-center'>
              <FileSignature className='h-5 w-5 text-yellow-400 mr-2' />
              <h5 className='font-medium'>Signature</h5>
            </div>
            <p className='text-xs text-slate-400 mt-2'>3045022100f4b...</p>
          </Card>

          <span className='text-slate-400'>=</span>

          <Card
            className={`p-4 border-none w-full md:w-auto ${
              verificationComplete ? 'bg-green-900/30' : 'bg-slate-800'
            }`}
          >
            <div className='flex items-center'>
              {verificationComplete ? (
                <CheckCircle className='h-5 w-5 text-green-400 mr-2' />
              ) : (
                <XCircle className='h-5 w-5 text-slate-400 mr-2' />
              )}
              <h5 className='font-medium'>Verification</h5>
            </div>
            <p className='text-xs text-slate-400 mt-2'>
              {verificationComplete
                ? 'Valid Signature'
                : 'Pending Verification'}
            </p>
          </Card>
        </div>

        {!verificationComplete && (
          <div className='flex justify-center'>
            <Button
              onClick={startVerification}
              disabled={isVerifying}
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold'
            >
              {isVerifying ? 'Verifying...' : 'Start Verification'}
            </Button>
          </div>
        )}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-slate-700 p-6 rounded-lg mt-8'
        >
          <h4 className='font-bold text-lg mb-4'>
            How Signature Verification Works
          </h4>

          <ul className='space-y-3'>
            <li className='flex items-start'>
              <span className='text-green-400 mr-2'>•</span>
              <span>
                Each node in the Bitcoin network independently verifies your
                transaction signature.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-green-400 mr-2'>•</span>
              <span>
                The verification process uses your public key (which is included
                in the transaction) to check if the signature was created with
                the corresponding private key.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-green-400 mr-2'>•</span>
              <span>
                This mathematical verification proves you authorized the
                transaction without requiring a central authority to confirm
                your identity.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-green-400 mr-2'>•</span>
              <span>
                If the signature is valid, nodes will include your transaction
                in the blockchain.
              </span>
            </li>
          </ul>

          <div className='mt-6 bg-slate-800 p-4 rounded-md'>
            <p className='text-sm italic'>
              <strong>Key Insight:</strong> This decentralized verification is
              what allows Bitcoin to operate without banks or payment
              processors. Anyone can verify ownership and authorization without
              needing to trust a central authority.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
