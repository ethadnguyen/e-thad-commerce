'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // Implement your login logic here
      console.log(values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect after successful login
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loginWithGoogle() {
    try {
      setIsGoogleLoading(true);
      // Implement Google login logic here

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect after successful login
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className='container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <Icons.logo className='mr-2 h-6 w-6' />
          Logo
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Đây là một cửa hàng tuyệt vời để mua sắm các linh kiện máy
              tính.&rdquo;
            </p>
            <footer className='text-sm'>Khách hàng</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Đăng nhập vào tài khoản
            </h1>
            <p className='text-sm text-muted-foreground'>
              Nhập email và mật khẩu của bạn để đăng nhập
            </p>
          </div>

          <div className='grid gap-6'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='example@gmail.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='••••••'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className='w-full' type='submit' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Đăng nhập
                </Button>
              </form>
            </Form>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Hoặc tiếp tục với
                </span>
              </div>
            </div>

            <Button
              variant='outline'
              type='button'
              disabled={isGoogleLoading}
              onClick={loginWithGoogle}
            >
              {isGoogleLoading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Icons.google className='mr-2 h-4 w-4' />
              )}
              Google
            </Button>
          </div>

          <p className='px-8 text-center text-sm text-muted-foreground'>
            Chưa có tài khoản?{' '}
            <Link
              href='/auth/sign-up'
              className='underline underline-offset-4 hover:text-primary'
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
