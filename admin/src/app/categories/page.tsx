'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import {
  CategoryRes,
  CategoryListRes,
} from '@/services/types/response/category-res';
import {
  fetchAllCategories,
  deleteCategory,
} from '@/services/modules/categories.service';
import CategoryDialog from './category-dialog';
import CustomBreadcrumb from '@/components/custom/custom-breadcrumb';
import { PageBody } from '@/components/custom/page-body';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import PaginationWrapper from '@/components/custom/pagination-wrapper';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';

const getData = async (page: number = 1): Promise<CategoryListRes | null> => {
  try {
    const result = await fetchAllCategories({
      page: page,
      size: 10,
    });
    if (result.status === 200) {
      return result.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export default function CategoriesPage() {
  const [dialog, setDialog] = useState({
    isOpen: false,
    isUpdate: false,
    showDelete: false,
    selectedCategory: null as CategoryRes | null,
  });

  const [pageData, setPageData] = useState({
    data: null as CategoryListRes | null,
    currentPage: 1,
    isLoading: false,
    searchKey: '',
  });

  const { toast } = useToast();

  const [categories, setCategories] = useState<CategoryRes[]>([]);

  const fetchData = async () => {
    try {
      setPageData((prev) => ({ ...prev, isLoading: true }));
      const result = await getData(pageData.currentPage);
      setPageData((prev) => ({ ...prev, data: result }));
    } catch (error) {
      toast({
        title: 'Thất bại',
        description: 'Không thể tải danh sách danh mục',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setPageData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await fetchAllCategories();
      if (result.status === 200) {
        setCategories(result.data.categories);
      }
    } catch (error) {
      toast({
        title: 'Thất bại',
        description: 'Không thể tải danh sách danh mục',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [pageData.currentPage]);

  const handleDialog = (
    type: 'add' | 'update' | 'delete' | 'close',
    category?: CategoryRes
  ) => {
    setDialog({
      isOpen: type === 'add' || type === 'update',
      isUpdate: type === 'update',
      showDelete: type === 'delete',
      selectedCategory: category || null,
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await deleteCategory(id);
        toast({
          title: 'Thành công',
          description: 'Xóa danh mục thành công',
          duration: 3000,
        });
        fetchData(); // Refresh data sau khi xóa
      } catch (error) {
        toast({
          title: 'Thất bại',
          description: 'Không thể xóa danh mục',
          variant: 'destructive',
          duration: 3000,
        });
      }
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const clearSearch = () => {
    setPageData((prev) => ({ ...prev, searchKey: '' }));
    fetchData();
  };

  const dialogProps = {
    open: dialog.isOpen,
    onClose: () => {
      handleDialog('close');
    },
    isUpdate: dialog.isUpdate,
    dataReq: dialog.selectedCategory,
    fetchData: fetchData,
    categories: categories,
  };

  // Hàm đệ quy để render categories theo cấp
  const renderCategories = (
    categories: CategoryRes[],
    parentId: number | null = null,
    level: number = 0
  ) => {
    return categories
      .filter((category) => {
        if (parentId === null) {
          return !category.parent?.id;
        }
        return category.parent?.id === parentId;
      })
      .map((category) => (
        <React.Fragment key={category.id}>
          <TableRow>
            <TableCell>{category.id}</TableCell>
            <TableCell>
              <div style={{ paddingLeft: `${level * 20}px` }}>
                {category.name}
              </div>
            </TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>
              {category.is_active ? 'Hoạt động' : 'Không hoạt động'}
            </TableCell>
            <TableCell>
              <div className='flex space-x-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handleDialog('update', category)}
                >
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  variant='destructive'
                  size='icon'
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          {renderCategories(categories, category.id, level + 1)}
        </React.Fragment>
      ));
  };

  return (
    <>
      <CategoryDialog {...dialogProps} />
      <PageBody>
        <div className='flex flex-col gap-4 col-span-12 md:col-span-12'>
          <CustomBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Quản lý danh mục' },
            ]}
          />
          <h1 className='text-xl font-medium'>Quản lý danh mục</h1>

          <div>
            <div className='grid grid-cols-12'>
              <div className='relative w-full col-span-6'>
                <Input
                  className='pl-9'
                  placeholder='Tìm kiếm'
                  value={pageData.searchKey}
                  onChange={(e) =>
                    setPageData((prev) => ({
                      ...prev,
                      searchKey: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <Search className='absolute left-0 top-0 m-2.5 h-4 w-4 text-muted-foreground' />
              </div>
              <div className='col-span-6 flex justify-end'>
                <Button onClick={() => handleDialog('add')}>
                  <Plus className='mr-2 h-4 w-4' />
                  Thêm mới
                </Button>
              </div>
            </div>

            <div className='mt-4'>
              <div className='rounded-md border'>
                {pageData.isLoading ? (
                  <div className='flex items-center justify-center h-32 text-muted-foreground'>
                    Đang tải...
                  </div>
                ) : !pageData.data?.categories ||
                  pageData.data.categories.length === 0 ? (
                  <div className='flex items-center justify-center h-32 text-muted-foreground'>
                    Chưa có danh mục nào
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên danh mục</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderCategories(pageData.data.categories)}
                    </TableBody>
                  </Table>
                )}
              </div>
              {pageData.data && (
                <PaginationWrapper
                  className='justify-end mt-4'
                  totalPage={pageData.data.totalPages}
                  onPageChange={(page) =>
                    setPageData((prev) => ({ ...prev, currentPage: page }))
                  }
                />
              )}
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
