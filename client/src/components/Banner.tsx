import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Banner() {
  return (
    <div className='bg-primary text-primary-foreground py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between'>
        <div className='text-center sm:text-left mb-4 sm:mb-0'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2'>
            Build Your Dream PC
          </h1>
          <p className='text-sm sm:text-base md:text-lg max-w-xl'>
            Customize your perfect computer with our easy-to-use builder.
          </p>
        </div>
        <div className='mt-4 sm:mt-0'>
          <Button
            asChild
            size='lg'
            className='bg-accent text-accent-foreground hover:bg-accent/90'
          >
            <Link href='/builder'>Start Building Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
