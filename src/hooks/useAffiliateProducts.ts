import { useState, useEffect } from 'react';
import type { AffiliateProduct } from '../data/affiliateProducts';
import { INITIAL_PRODUCTS } from '../data/affiliateProducts';

export const useAffiliateProducts = () => {
  const [products, setProducts] = useState<AffiliateProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('affiliate_catalog');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('affiliate_catalog', JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  const addProduct = (product: Omit<AffiliateProduct, 'id'>) => {
    const newProduct = { ...product, id: `aff_${Date.now()}` };
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('affiliate_catalog', JSON.stringify(updated));
  };

  const updateProduct = (id: string, updates: Partial<AffiliateProduct>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    setProducts(updated);
    localStorage.setItem('affiliate_catalog', JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('affiliate_catalog', JSON.stringify(updated));
  };

  return { products, addProduct, updateProduct, deleteProduct };
};
