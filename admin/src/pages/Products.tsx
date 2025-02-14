import type React from 'react';
import Table from '../components/Table';

const Products: React.FC = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' },
  ];

  const data = [
    {
      id: 1,
      name: 'Intel Core i7',
      category: 'CPU',
      price: '$299.99',
      stock: 50,
    },
    {
      id: 2,
      name: 'NVIDIA RTX 3080',
      category: 'GPU',
      price: '$699.99',
      stock: 25,
    },
    {
      id: 3,
      name: 'Samsung 1TB SSD',
      category: 'Storage',
      price: '$129.99',
      stock: 100,
    },
  ];

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Products</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Products;
