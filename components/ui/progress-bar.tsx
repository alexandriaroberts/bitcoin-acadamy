import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-sm'>
        <span>Module Progress</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className='h-2 bg-slate-700' />
    </div>
  );
}
