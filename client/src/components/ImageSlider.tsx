'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className='relative w-full h-96'>
      <Image
        src={images[currentIndex]}
        alt={`Product image ${currentIndex + 1}`}
        layout='fill'
        objectFit='cover'
        className='rounded-lg'
      />
      <Button
        variant='outline'
        size='icon'
        className='absolute top-1/2 left-2 transform -translate-y-1/2'
        onClick={prevSlide}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
      <Button
        variant='outline'
        size='icon'
        className='absolute top-1/2 right-2 transform -translate-y-1/2'
        onClick={nextSlide}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
}
