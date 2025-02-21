'use client';

import React, { useMemo } from 'react';
import { CategoryRes } from '@/services/types/response/category-res';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategorySelectProps {
  value: number | null;
  onChange: (value: number | null) => void;
  categories: CategoryRes[];
  excludeId?: number;
  className?: string;
  loading?: boolean;
}

export function CategorySelect({
  value,
  onChange,
  categories,
  excludeId,
  className,
  loading = false,
}: CategorySelectProps) {
  const availableCategories = useMemo(() => {
    if (!excludeId) return categories;

    const isDescendant = (category: CategoryRes, targetId: number): boolean => {
      if (category.id === targetId) return true;
      return (
        category.children?.some((child) => isDescendant(child, targetId)) ||
        false
      );
    };

    return categories.filter(
      (cat) => cat.id !== excludeId && !isDescendant(cat, excludeId)
    );
  }, [categories, excludeId]);

  // Tìm category được chọn trong danh sách gốc categories
  const selectedCategory = useMemo(() => {
    if (value === null) return null;
    return categories.find((cat) => cat.id === value);
  }, [categories, value]);

  if (loading) {
    return <div className='h-10 animate-pulse bg-muted rounded-md' />;
  }

  return (
    <Select
      value={value?.toString() || 'none'}
      onValueChange={(val) => onChange(val === 'none' ? null : Number(val))}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder='Chọn danh mục cha'>
          {selectedCategory?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='none'>Không có danh mục cha</SelectItem>
          {availableCategories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
