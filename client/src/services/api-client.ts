import { CustomAxiosResponse } from '@/common/interface/axios';
import { errorMessage } from '@/common/message';
import { accessToken } from '@/constants';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie(accessToken);
    if (typeof token === 'string' && token.length > 0) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(`Axios token: ${token}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use((config) => {
  return config;
});

export const get = (
  url: string,
  params: any = {}
): Promise<CustomAxiosResponse> => {
  return new Promise((resolve, reject) => {
    apiClient.get(url, { params }).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage(`GET ${url} error`);
        reject(new Error(err));
      }
    );
  });
};

export const post = (
  url: string,
  data: any = {}
): Promise<CustomAxiosResponse> => {
  return new Promise((resolve, reject) => {
    apiClient.post(url, data).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage(`POST ${url} error`);
        reject(new Error(err));
      }
    );
  });
};

export const put = (
  url: string,
  data: any = {}
): Promise<CustomAxiosResponse> => {
  return new Promise((resolve, reject) => {
    apiClient.put(url, data).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage(`PUT ${url} error`);
        reject(new Error(err));
      }
    );
  });
};

export const patch = (
  url: string,
  data: any = {}
): Promise<CustomAxiosResponse> => {
  return new Promise((resolve, reject) => {
    apiClient.patch(url, data).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage(`PATCH ${url} error`);
        reject(new Error(err));
      }
    );
  });
};

export const del = (url: string, params: any = {}) => {
  return new Promise((resolve, reject) => {
    apiClient.delete(url, { params }).then(
      (res: CustomAxiosResponse) => {
        resolve(res);
      },
      (err) => {
        errorMessage(`DELETE ${url} error`);
        reject(new Error(err));
      }
    );
  });
};

export const postFormData = (
  url: string,
  formData: FormData
): Promise<CustomAxiosResponse> => {
  return new Promise((resolve, reject) => {
    apiClient
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(
        (res: CustomAxiosResponse) => {
          resolve(res);
        },
        (err) => {
          errorMessage(`POST ${url} error`);
          reject(new Error(err));
        }
      );
  });
};

export default apiClient;
