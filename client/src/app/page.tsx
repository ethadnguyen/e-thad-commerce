import CategorySection from '@/components/categories-section';
import ProductSection from '@/components/products-section';
import Banner from '@/components/Banner';

export default function HomePage() {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Banner */}
      <Banner />

      {/* Categories */}
      <CategorySection />

      {/* Products */}
      <ProductSection />
    </div>
  );
}
