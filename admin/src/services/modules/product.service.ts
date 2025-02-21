import { del, get, post, postFormData, put } from '../api_client';

export const fetchAllProducts = (data?: any) => {
  return get('/products/all', data);
};

export const fetchProductById = (id: number) => {
  return get(`/products/${id}`);
};

export const createProduct = (data: any) => {
  return postFormData('/products', data);
};

export const updateProduct = (data: any) => {
  return put(`/products/update`, data);
};

export const deleteProduct = (id: number) => {
  return del(`/products/${id}`);
};

export const createCPU = (data: any) => {
  return post('/cpu', data);
};
