import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GPU } from '../../../../src/types/components';

interface GpuCardProps {
  gpu: GPU;
}

export const GpuCard = ({ gpu }: GpuCardProps) => {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center gap-2'>
        {' '}
        <h3 className='font-semibold text-lg'>{gpu.name}</h3>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='text-muted-foreground'>VRAM:</div>
          <div>{gpu.vram}GB</div>
          <div className='text-muted-foreground'>Kiểu bộ nhớ:</div>
          <div>{gpu.memoryType}</div>
          <div className='text-muted-foreground'>Xung nhịp:</div>
          <div>{gpu.clockSpeed} MHz</div>
          <div className='text-muted-foreground'>Công suất:</div>
          <div>{gpu.tdp}W</div>
          <div className='text-muted-foreground'>Chiều dài:</div>
          <div>{gpu.length}mm</div>
        </div>
      </CardContent>
    </Card>
  );
};
