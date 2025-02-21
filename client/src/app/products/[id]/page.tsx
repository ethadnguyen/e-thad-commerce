import { ImageSlider } from '@/components/image-slider';
import { ProductActions } from '@/components/product-actions';
import { Specifications } from '@/components/specifications';
import { ReviewsSection } from '@/components/reviews-section';
import { SimilarProducts } from '@/components/similar-products';

// Example data - In a real app, this would come from your database
const product = {
  id: '1',
  name: 'AMD Ryzen 9 7950X',
  price: 699,
  rating: 5,
  images: [
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
  ],
  type: 'CPU' as const,
  specs: {
    cores: 16,
    threads: 32,
    baseSpeed: '4.5 GHz',
    boostSpeed: '5.7 GHz',
    socket: 'AM5',
    cache: {
      l1: '1MB',
      l2: '16MB',
      l3: '64MB',
    },
    tdp: 170,
    integratedGraphics: 'AMD Radeon Graphics',
  },
};

const reviews = [
  {
    id: '1',
    rating: 5,
    comment: 'Great CPU, amazing performance!',
    author: 'John Doe',
    date: '2024-02-15',
  },
  {
    id: '2',
    rating: 4,
    comment: 'Good performance but runs a bit hot.',
    author: 'Jane Smith',
    date: '2024-02-14',
  },
  {
    id: '3',
    rating: 5,
    comment: "Best CPU I've ever used.",
    author: 'Mike Johnson',
    date: '2024-02-13',
  },
];

const similarProducts = [
  {
    id: '2',
    name: 'AMD Ryzen 7 7700X',
    price: 449,
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '3',
    name: 'AMD Ryzen 5 7600X',
    price: 299,
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '4',
    name: 'Intel Core i9-13900K',
    price: 589,
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '5',
    name: 'Intel Core i7-13700K',
    price: 409,
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '6',
    name: 'Intel Core i5-13600K',
    price: 319,
    image: '/placeholder.svg?height=400&width=400',
  },
];

export default function ProductPage() {
  return (
    <div className='container mx-auto px-4 py-8 space-y-12'>
      <div className='grid gap-8 lg:grid-cols-2'>
        {/* Left column - Image slider and actions */}
        <div className='space-y-6'>
          <ImageSlider images={product.images} />
          <ProductActions
            price={product.price}
            rating={product.rating}
            onAddToWishlist={() => console.log('Add to wishlist')}
            onBuyNow={() => console.log('Buy now')}
            onAddToCart={() => console.log('Add to cart')}
          />
        </div>

        {/* Right column - Specifications */}
        <div>
          <h2 className='text-2xl font-bold mb-4'>Specifications</h2>
          <Specifications product={product} />
        </div>
      </div>

      {/* Reviews section */}
      <ReviewsSection
        reviews={reviews}
        onSubmitReview={(comment, rating) => {
          console.log('New review:', { comment, rating });
        }}
      />

      {/* Similar products */}
      <SimilarProducts products={similarProducts} />
    </div>
  );
}
