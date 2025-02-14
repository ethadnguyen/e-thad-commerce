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
import { categories } from '../data/categories';
import Banner from '../components/Banner';
import { routes } from '../utils/routes';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className='space-y-12'>
      <Banner />

      <section className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-6'>
          Danh mục sản phẩm
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`${routes.products.path}?category=${category.id}`}
              className='block'
            >
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <CardTitle className='text-lg'>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    {category.childrenCategories.length} danh mục con
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-6'>
          Sản phẩm nổi bật
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
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={300}
                    height={200}
                    layout='responsive'
                    objectFit='cover'
                    className='rounded-md'
                  />
                </div>
                <p className='text-xl md:text-2xl font-bold'>
                  {product.price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
                <p className='text-sm text-muted-foreground'>{product.brand}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className='w-full'>
                  <Link
                    href={routes.productDetails(product.id.toString()).path}
                  >
                    Xem chi tiết
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className='mt-8 text-center'>
          <Button asChild>
            <Link href={routes.products.path}>
              Xem tất cả sản phẩm <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>

      <section className='bg-secondary py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl md:text-3xl font-semibold mb-8 text-center'>
            Tại sao chọn TechBuild?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card>
              <CardHeader>
                <Tool className='h-10 w-10 mb-2 text-primary' />
                <CardTitle>Tùy chỉnh theo ý muốn</CardTitle>
              </CardHeader>
              <CardContent>
                Tạo PC hoàn hảo của bạn với công cụ xây dựng dễ sử dụng của
                chúng tôi. Chọn từ nhiều linh kiện đa dạng.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className='h-10 w-10 mb-2 text-primary' />
                <CardTitle>Hỗ trợ chuyên nghiệp</CardTitle>
              </CardHeader>
              <CardContent>
                Đội ngũ chuyên gia công nghệ của chúng tôi luôn sẵn sàng giúp đỡ
                bạn với mọi câu hỏi hoặc vấn đề.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className='h-10 w-10 mb-2 text-primary' />
                <CardTitle>Chất lượng đảm bảo</CardTitle>
              </CardHeader>
              <CardContent>
                Chúng tôi chỉ sử dụng các linh kiện chất lượng cao, đã được kiểm
                tra để đảm bảo hiệu suất và độ tin cậy tốt nhất.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 text-center'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-4'>
          Sẵn sàng xây dựng PC trong mơ của bạn?
        </h2>
        <p className='mb-6 text-lg'>
          Bắt đầu hành trình đến chiếc PC tùy chỉnh hoàn hảo ngay hôm nay.
        </p>
        <Button asChild size='lg'>
          <Link href={routes.builder.path}>Bắt đầu xây dựng ngay</Link>
        </Button>
      </section>
    </div>
  );
}
