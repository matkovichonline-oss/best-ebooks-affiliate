import type { AffiliateProduct } from '../data/affiliateProducts';
import { ShoppingBag } from 'lucide-react';

export const AffiliateProductCard = ({ product }: { product: AffiliateProduct }) => {
  return (
    <article className="editorial-card">
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* Mock Book Cover */}
        <div style={{
          flexShrink: 0,
          width: '180px',
          height: '260px',
          background: 'linear-gradient(to bottom right, #f87171, #ef4444)',
          borderRadius: '4px',
          boxShadow: '4px 4px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: 1.3
        }}>
          {product.coverText}
        </div>

        {/* Content Section */}
        <div style={{ flex: 1 }}>
          <h2>{product.title}</h2>
          <p className="review-text">{product.miniReview}</p>
          
          <a 
            href={product.amazonUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-amazon"
          >
            <ShoppingBag size={20} /> View on Amazon
          </a>
        </div>
      </div>
    </article>
  );
};
