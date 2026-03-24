import { useState, useEffect } from 'react';
import { defaultProducts, type AffiliateProduct } from '../data/affiliateProducts';

export const useAffiliateProducts = () => {
  const [products, setProducts] = useState<AffiliateProduct[]>(() => {
    // We append _v2 so it forces a cache clear and loads our 30 new books
    const saved = localStorage.getItem('affiliate_products_v2');
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem('affiliate_products_v2', JSON.stringify(products));
  }, [products]);

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
