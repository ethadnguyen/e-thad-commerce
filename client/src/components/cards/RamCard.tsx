import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RAM } from '../../../../src/types/components';

interface RamCardProps {
  ram: RAM;
}

export const RamCard = ({ ram }: RamCardProps) => {
  return (
    <Card className='w-full hover:shadow-lg transition-shadow'>
      <CardHeader>
        <h3 className='font-semibold text-lg'>{ram.name}</h3>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='text-muted-foreground'>Dung lượng:</div>
          <div>{ram.capacity}GB</div>
          <div className='text-muted-foreground'>Tốc độ:</div>
          <div>{ram.speed} MHz</div>
          <div className='text-muted-foreground'>Loại:</div>
          <div>DDR{ram.type}</div>
          <div className='text-muted-foreground'>Timing:</div>
          <div>{ram.timing}</div>
        </div>
      </CardContent>
    </Card>
  );
};
