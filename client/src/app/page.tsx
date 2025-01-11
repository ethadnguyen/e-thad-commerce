import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, PenToolIcon as Tool, Zap, Shield } from 'lucide-react';
import { products } from '../data/products';
import Banner from '../components/Banner';
import { routes } from '@/utils/routes';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className='space-y-12'>
      <Banner />

      <section className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-6'>
          Featured Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {featuredProducts.map((product) => (
            <Card key={product.id} className='flex flex-col'>
              <CardHeader>
                <CardTitle className='text-lg md:text-xl'>
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex-grow'>
                <div className='aspect-w-16 aspect-h-9 mb-4'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    layout='responsive'
                    objectFit='cover'
                    className='rounded-md'
                  />
                </div>
                <p className='text-xl md:text-2xl font-bold'>
                  ${product.price}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {product.categoryId}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className='w-full'>
                  <Link href={routes.productDetails(product.id)}>
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className='mt-8 text-center'>
          <Button asChild>
            <Link href={routes.products}>
              View All Products <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>

      <section className='bg-secondary py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl md:text-3xl font-semibold mb-8 text-center'>
            Why Choose TechBuild?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card>
              <CardHeader>
                <Tool className='h-10 w-10 mb-2 text-primary' />
                <CardTitle>Custom Builds</CardTitle>
              </CardHeader>
              <CardContent>
                Create your perfect PC with our easy-to-use builder tool. Choose
                from a wide range of components.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className='h-10 w-10 mb-2 text-primary' />
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                Our team of tech experts is always ready to help you with any
                questions or issues.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className='h-10 w-10 mb-2 text-primary' />
                <CardTitle>Quality Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                We only use high-quality, tested components to ensure the best
                performance and reliability.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 text-center'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-4'>
          Ready to Build Your Dream PC?
        </h2>
        <p className='mb-6 text-lg'>
          Start your journey to the perfect custom PC today.
        </p>
        <Button asChild size='lg'>
          <Link href={routes.builder}>Start Building Now</Link>
        </Button>
      </section>
    </div>
  );
}
