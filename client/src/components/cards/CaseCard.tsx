import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Case } from '../../../../src/types/components';

interface CaseCardProps {
  case: Case;
}

export const CaseCard = ({ case: pcCase }: CaseCardProps) => {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center gap-2'>
        <h3 className='font-semibold text-lg'>{pcCase.name}</h3>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='text-muted-foreground'>Form Factor:</div>
          <div>{pcCase.formFactor}</div>
          <div className='text-muted-foreground'>Chiều dài GPU tối đa:</div>
          <div>{pcCase.maxGpuLength}mm</div>
          <div className='text-muted-foreground'>Chiều cao tản nhiệt CPU:</div>
          <div>{pcCase.maxCpuCoolerHeight}mm</div>
          <div className='text-muted-foreground'>Số quạt đi kèm:</div>
          <div>{pcCase.includedFans}</div>
        </div>
      </CardContent>
    </Card>
  );
};
