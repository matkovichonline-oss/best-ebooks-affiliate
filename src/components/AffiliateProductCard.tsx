import type { AffiliateProduct } from '../data/affiliateProducts';
import { ShoppingBag } from 'lucide-react';

export const AffiliateProductCard = ({ product }: { product: AffiliateProduct }) => {
  return (
    <article className="editorial-card glass-card">
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Mock Book Cover */}
        <div style={{
          flexShrink: 0,
          width: '200px',
          height: '280px',
          background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
          borderRadius: '8px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.9)',
          padding: '24px',
          textAlign: 'center',
          fontWeight: '700',
          lineHeight: 1.2,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '1.1rem'
        }}>
          {product.coverText}
        </div>

        {/* Content Section */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>{product.title}</h2>
          <p className="review-text">{product.miniReview}</p>
          
          <a 
            href={product.amazonUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-amazon"
          >
            <ShoppingBag size={22} /> View on Amazon
          </a>
        </div>
      </div>
    </article>
  );
};
