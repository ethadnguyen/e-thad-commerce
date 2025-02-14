import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { products } from '../../../data/products';
import ImageSlider from '../../../components/ImageSlider';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  // For demonstration purposes, we'll create multiple images
  const productImages = [
    product.image,
    '/placeholder.svg?height=300&width=300',
    '/placeholder.svg?height=300&width=300',
  ];

  return (
    <div className='space-y-8'>
      <h1 className='text-3xl font-bold'>{product.name}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <Card className='bg-secondary border-primary'>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageSlider images={productImages} />
            <p className='text-2xl font-bold mt-4'>${product.price}</p>
            <p className='mb-2'>
              <span className='font-semibold'>Category:</span>{' '}
              {product.categoryId}
            </p>
            <p>{product.description}</p>
          </CardContent>
          <CardFooter>
            <Button className='w-full bg-primary text-primary-foreground hover:bg-primary/90'>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
        <Card className='bg-secondary border-primary'>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc list-inside space-y-2'>
              {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
