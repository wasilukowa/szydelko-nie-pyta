import type { Product } from '../types/product';

const BASE_URL = import.meta.env.VITE_WP_URL ?? '';
const API_URL = `${BASE_URL}/wp-json/wc/store/v1`;

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getProducts(params?: {
  per_page?: number;
  page?: number;
  category?: string;
  search?: string;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.per_page) query.set('per_page', String(params.per_page));
  if (params?.page) query.set('page', String(params.page));
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('search', params.search);

  const qs = query.toString() ? `?${query.toString()}` : '';
  return apiFetch<Product[]>(`/products${qs}`);
}

export async function getProduct(slug: string): Promise<Product> {
  const products = await apiFetch<Product[]>(`/products?slug=${slug}`);
  if (!products.length) throw new Error('Produkt nie znaleziony');
  return products[0];
}

export function getCheckoutUrl(): string {
  return `${BASE_URL}/checkout`;
}
