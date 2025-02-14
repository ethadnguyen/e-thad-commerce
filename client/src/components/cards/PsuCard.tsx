import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PSU } from '../../../../src/types/components';

interface PsuCardProps {
  psu: PSU;
}

export const PsuCard = ({ psu }: PsuCardProps) => {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center gap-2'>
        <h3 className='font-semibold text-lg'>{psu.name}</h3>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='text-muted-foreground'>Công suất:</div>
          <div>{psu.wattage}W</div>
          <div className='text-muted-foreground'>Hiệu suất:</div>
          <div>{psu.efficiency}</div>
          <div className='text-muted-foreground'>Chuẩn:</div>
          <div>{psu.formFactor}</div>
          <div className='text-muted-foreground'>Modular:</div>
          <div>{psu.modular ? 'Có' : 'Không'}</div>
        </div>
      </CardContent>
    </Card>
  );
};
