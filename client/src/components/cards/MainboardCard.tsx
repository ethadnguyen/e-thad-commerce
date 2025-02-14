import { CircuitBoard } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Mainboard } from '../../../../src/types/components';

interface MainboardCardProps {
  mainboard: Mainboard;
}

export const MainboardCard = ({ mainboard }: MainboardCardProps) => {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center gap-2'>
        <CircuitBoard className='h-6 w-6' />
        <h3 className='font-semibold text-lg'>{mainboard.name}</h3>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='text-muted-foreground'>Socket:</div>
          <div>{mainboard.socket}</div>
          <div className='text-muted-foreground'>Chipset:</div>
          <div>{mainboard.chipset}</div>
          <div className='text-muted-foreground'>Form Factor:</div>
          <div>{mainboard.formFactor}</div>
          <div className='text-muted-foreground'>Khe RAM:</div>
          <div>{mainboard.ramSlots}</div>
          <div className='text-muted-foreground'>Hỗ trợ RAM:</div>
          <div>DDR{mainboard.ramType}</div>
          <div className='text-muted-foreground'>Khe M.2:</div>
          <div>{mainboard.m2Slots}</div>
        </div>
      </CardContent>
    </Card>
  );
};
