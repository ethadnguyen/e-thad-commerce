'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { CategorySelect } from '@/components/category/category-select';
import { ProductRes } from '@/services/types/response/product-res';
import { ProductType } from '@/services/types/request/product-req';
import { CategoryRes } from '@/services/types/response/category-res';
import { fetchAllCategories } from '@/services/modules/categories.service';
import { successMessage, errorMessage } from '@/common/message';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/services/modules/product.service';
import { PlusCircle, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductDialogProps {
  open?: boolean;
  onClose?: () => void;
  product: ProductRes | null;
  onRefresh: () => void;
}

// Form cho thông tin chung của sản phẩm
const BaseProductForm = ({
  form,
  categories,
}: {
  form: any;
  categories: CategoryRes[];
}) => (
  <>
    <div className='grid gap-2'>
      <Label htmlFor='name'>Tên sản phẩm</Label>
      <Controller
        name='name'
        control={form.control}
        render={({ field }) => (
          <Input {...field} placeholder='Nhập tên sản phẩm' />
        )}
      />
    </div>

    <div className='grid gap-2'>
      <Label htmlFor='description'>Mô tả</Label>
      <Controller
        name='description'
        control={form.control}
        render={({ field }) => (
          <Textarea {...field} placeholder='Nhập mô tả sản phẩm' />
        )}
      />
    </div>

    <div className='grid gap-2'>
      <Label htmlFor='price'>Giá</Label>
      <Controller
        name='price'
        control={form.control}
        render={({ field }) => (
          <Input {...field} type='number' placeholder='Nhập giá sản phẩm' />
        )}
      />
    </div>

    <div className='grid gap-2'>
      <Label htmlFor='stock'>Số lượng</Label>
      <Controller
        name='stock'
        control={form.control}
        render={({ field }) => (
          <Input {...field} type='number' placeholder='Nhập số lượng' />
        )}
      />
    </div>

    <div className='grid gap-2'>
      <Label>Danh mục</Label>
      <Controller
        name='category_ids'
        control={form.control}
        render={({ field }) => (
          <CategorySelect
            value={field.value}
            onChange={field.onChange}
            categories={categories}
            className='w-full'
          />
        )}
      />
    </div>

    <div className='flex items-center space-x-2'>
      <Controller
        name='is_active'
        control={form.control}
        render={({ field }) => (
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        )}
      />
      <Label>Đang bán</Label>
    </div>
  </>
);

// Form cho CPU
const CPUForm = ({ form }: { form: any }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    {/* Cột 1 */}
    <div className='space-y-4'>
      <div className='grid gap-2'>
        <Label>Socket</Label>
        <Controller
          name='specifications.socket'
          control={form.control}
          render={({ field }) => <Input {...field} placeholder='Nhập socket' />}
        />
      </div>

      <div className='grid gap-2'>
        <Label>Số nhân</Label>
        <Controller
          name='specifications.cores'
          control={form.control}
          render={({ field }) => (
            <Input {...field} type='number' placeholder='Số nhân' />
          )}
        />
      </div>

      <div className='grid gap-2'>
        <Label>Số luồng</Label>
        <Controller
          name='specifications.threads'
          control={form.control}
          render={({ field }) => (
            <Input {...field} type='number' placeholder='Số luồng' />
          )}
        />
      </div>

      <div className='grid gap-2'>
        <Label>Cache</Label>
        <Controller
          name='specifications.cache'
          control={form.control}
          render={({ field }) => (
            <Input {...field} placeholder='Ví dụ: L3 16MB' />
          )}
        />
      </div>
    </div>

    {/* Cột 2 */}
    <div className='space-y-4'>
      <div className='grid gap-2'>
        <Label>Xung cơ bản (GHz)</Label>
        <Controller
          name='specifications.baseClock'
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              type='number'
              step='0.1'
              placeholder='Xung cơ bản'
            />
          )}
        />
      </div>

      <div className='grid gap-2'>
        <Label>Xung boost (GHz)</Label>
        <Controller
          name='specifications.boostClock'
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              type='number'
              step='0.1'
              placeholder='Xung boost'
            />
          )}
        />
      </div>

      <div className='grid gap-2'>
        <Label>TDP (W)</Label>
        <Controller
          name='specifications.tdp'
          control={form.control}
          render={({ field }) => (
            <Input {...field} type='number' placeholder='TDP' />
          )}
        />
      </div>

      <div className='grid gap-2'>
        <Label>Công suất (W)</Label>
        <Controller
          name='specifications.wattage'
          control={form.control}
          render={({ field }) => (
            <Input {...field} type='number' placeholder='Công suất' />
          )}
        />
      </div>
    </div>
  </div>
);

// Interface cho cặp key-value
interface SpecificationPair {
  key: string;
  value: string;
}

// Component quản lý specifications
const SpecificationsForm = ({ form }: { form: any }) => {
  const [specs, setSpecs] = useState<SpecificationPair[]>([]);

  // Load specifications từ form khi component mount
  useEffect(() => {
    const currentSpecs = form.getValues('specifications') || {};
    setSpecs(
      Object.entries(currentSpecs).map(([key, value]) => ({
        key,
        value: value as string,
      }))
    );
  }, [form]);

  // Cập nhật specifications vào form khi specs thay đổi
  useEffect(() => {
    const specsObject = specs.reduce(
      (acc, { key, value }) => ({ ...acc, [key]: value }),
      {}
    );
    form.setValue('specifications', specsObject);
  }, [specs, form]);

  const addSpecification = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const updateSpecification = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h4 className='font-medium'>Thông số bổ sung</h4>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={addSpecification}
        >
          <PlusCircle className='mr-2 h-4 w-4' />
          Thêm thông số
        </Button>
      </div>

      {specs.map((spec, index) => (
        <div key={index} className='flex gap-2 items-start'>
          <div className='grid gap-2 flex-1'>
            <Input
              placeholder='Tên thông số'
              value={spec.key}
              onChange={(e) =>
                updateSpecification(index, 'key', e.target.value)
              }
            />
          </div>
          <div className='grid gap-2 flex-1'>
            <Input
              placeholder='Giá trị'
              value={spec.value}
              onChange={(e) =>
                updateSpecification(index, 'value', e.target.value)
              }
            />
          </div>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => removeSpecification(index)}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default function ProductDialog({
  open,
  onClose,
  product,
  onRefresh,
}: ProductDialogProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryRes[]>([]);

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category_ids: [],
      is_active: true,
      type: ProductType.CPU,
      specifications: {
        socket: '',
        cores: 0,
        threads: 0,
        baseClock: 0,
        boostClock: 0,
        cache: '',
        tdp: 0,
        wattage: 0,
      },
    },
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await fetchAllCategories();
        if (result.status === 200) {
          setCategories(result.data.categories);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_ids: product.categories?.map((c) => c.id) || [],
        is_active: product.is_active,
        type: product.type as ProductType,
        specifications: product.specifications,
      });
    }
  }, [product, form.reset]);

  const handleDelete = async () => {
    if (!product) return;
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    setLoading(true);
    try {
      await deleteProduct(product.id);
      successMessage('Xóa sản phẩm thành công');
      onClose?.();
      onRefresh();
    } catch (error: any) {
      errorMessage(error?.message || 'Không thể xóa sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const formData = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        category_ids: data.category_ids,
        is_active: data.is_active,
        type: ProductType.CPU, // Tạm thời fix cứng là CPU
        specifications: {
          socket: data.specifications.socket,
          cores: Number(data.specifications.cores),
          threads: Number(data.specifications.threads),
          baseClock: Number(data.specifications.baseClock),
          boostClock: Number(data.specifications.boostClock),
          cache: data.specifications.cache,
          tdp: Number(data.specifications.tdp),
          wattage: Number(data.specifications.wattage),
        },
      };

      if (product) {
        await updateProduct(product.id, formData);
        successMessage('Cập nhật sản phẩm thành công');
      } else {
        await createProduct(formData);
        successMessage('Thêm sản phẩm thành công');
      }
      onClose?.();
      onRefresh();
    } catch (error: any) {
      errorMessage(error?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => !loading && onClose?.()}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-hidden flex flex-col'>
        <DialogHeader>
          <DialogTitle>
            {product ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 overflow-y-auto pr-2'
        >
          <BaseProductForm form={form} categories={categories} />

          <div className='grid gap-2'>
            <Label>Loại sản phẩm</Label>
            <Controller
              name='type'
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn loại sản phẩm' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ProductType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Hiển thị form tương ứng với type */}
          {form.watch('type') === ProductType.CPU && (
            <div className='border-t pt-4'>
              <h4 className='font-medium mb-4'>Thông số CPU</h4>
              <CPUForm form={form} />
            </div>
          )}

          {/* Form specifications */}
          <div className='border-t pt-4'>
            <SpecificationsForm form={form} />
          </div>

          <div className='flex justify-between space-x-2 sticky bottom-0 bg-background pt-4 border-t'>
            {product && (
              <Button
                type='button'
                variant='destructive'
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Xóa sản phẩm'}
              </Button>
            )}
            <div className='flex space-x-2 ml-auto'>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? 'Đang xử lý...' : product ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
