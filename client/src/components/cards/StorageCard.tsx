import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Storage } from '../../../../src/types/components';

interface StorageCardProps {
  storage: Storage;
}

export const StorageCard = ({ storage }: StorageCardProps) => {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center gap-2'>
        <h3 className='font-semibold text-lg'>{storage.name}</h3>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='text-muted-foreground'>Loại:</div>
          <div>{storage.type}</div>
          <div className='text-muted-foreground'>Dung lượng:</div>
          <div>{storage.capacity}GB</div>
          <div className='text-muted-foreground'>Giao tiếp:</div>
          <div>{storage.interface}</div>
          <div className='text-muted-foreground'>Tốc độ đọc:</div>
          <div>{storage.readSpeed} MB/s</div>
          <div className='text-muted-foreground'>Tốc độ ghi:</div>
          <div>{storage.writeSpeed} MB/s</div>
        </div>
      </CardContent>
    </Card>
  );
};
