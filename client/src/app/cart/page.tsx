'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/services/types/response/cart_types/cart';
import { formatCurrency } from '@/lib/utils';

// Example cart items - In a real app, this would come from your cart state management
const initialCartItems: CartItem[] = [
  {
    product: {
      id: '1',
      name: 'AMD Ryzen 9 7950X',
      price: 699,
      category: 'CPU',
      image: '/placeholder.svg',
      specs: {
        socket: 'AM5',
        cores: 16,
        threads: 32,
        tdp: 170,
      },
    },
    quantity: 1,
  },
  {
    product: {
      id: '2',
      name: 'ASUS ROG STRIX X670E-E GAMING WIFI',
      price: 499,
      category: 'MOTHERBOARD',
      image: '/placeholder.svg',
      specs: {
        socket: 'AM5',
        memory: {
          type: 'DDR5',
          maxSpeed: '6400MHz',
        },
      },
    },
    quantity: 1,
  },
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 1000 ? 0 : 50; // Free shipping over $1000
  const total = subtotal + shippingFee;

  function updateQuantity(productId: string, newQuantity: number) {
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  }

  function removeItem(productId: string) {
    setCartItems((items) =>
      items.filter((item) => item.product.id !== productId)
    );
  }

  function handleCheckout() {
    // In a real app, you would save the cart state
    router.push('/checkout');
  }

  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h1 className='text-2xl font-bold mb-4'>Your cart is empty</h1>
        <Button onClick={() => router.push('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-8'>Shopping Cart</h1>

      <div className='grid gap-8 lg:grid-cols-[1fr_400px]'>
        {/* Cart Items */}
        <div className='space-y-4'>
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className='flex gap-4 rounded-lg border p-4'
            >
              <div className='relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-md'>
                <Image
                  src={item.product.image || '/placeholder.svg'}
                  alt={item.product.name}
                  fill
                  className='object-cover'
                />
              </div>

              <div className='flex flex-1 flex-col justify-between'>
                <div className='space-y-1'>
                  <h3 className='font-medium'>{item.product.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {formatCurrency(item.product.price)}
                  </p>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                    <span className='w-8 text-center'>{item.quantity}</span>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>

                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className='rounded-lg border p-6 space-y-4 h-fit'>
          <h2 className='text-lg font-semibold'>Order Summary</h2>

          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>
                {shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}
              </span>
            </div>
            <Separator />
            <div className='flex justify-between text-lg font-semibold'>
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button className='w-full' onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
