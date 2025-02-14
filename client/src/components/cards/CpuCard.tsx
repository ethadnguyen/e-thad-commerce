import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CPU } from '../../../../src/types/components';

interface CpuCardProps {
  cpu: CPU;
}

export const CpuCard = ({ cpu }: CpuCardProps) => {
  return (
    <Card className='w-full hover:shadow-lg transition-shadow'>
      <CardHeader>
        <h3 className='font-semibold text-lg'>{cpu.name}</h3>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='text-muted-foreground'>Socket:</div>
          <div>{cpu.socket}</div>
          <div className='text-muted-foreground'>Số nhân:</div>
          <div>{cpu.cores}</div>
          <div className='text-muted-foreground'>Số luồng:</div>
          <div>{cpu.threads}</div>
          <div className='text-muted-foreground'>Xung nhịp cơ bản:</div>
          <div>{cpu.baseSpeed} GHz</div>
          <div className='text-muted-foreground'>Xung nhịp tối đa:</div>
          <div>{cpu.boostSpeed} GHz</div>
          <div className='text-muted-foreground'>Cache:</div>
          <div>{cpu.cache}MB</div>
          <div className='text-muted-foreground'>TDP:</div>
          <div>{cpu.tdp}W</div>
        </div>
      </CardContent>
    </Card>
  );
};
