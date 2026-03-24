import type { AffiliateProduct } from '../data/affiliateProducts';
import { Star } from 'lucide-react';

export const AffiliateProductCard = ({ product }: { product: AffiliateProduct }) => {
  return (
    <article className="glass-card grid-card">
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        
        {/* Mock Book Cover Small */}
        <div style={{
          flexShrink: 0,
          width: '100px',
          height: '150px',
          background: 'linear-gradient(135deg, #101510 0%, #0a100a 100%)',
          borderRadius: '6px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)',
          padding: '2px', // enough padding to let the border shine
          textAlign: 'center',
          fontWeight: '400',
          fontFamily: 'var(--font-serif)',
          border: '1px solid var(--border)',
          overflow: 'hidden'
        }}>
          {product.coverUrl ? (
            <img src={product.coverUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
          ) : (
            <div style={{ padding: '10px', fontSize: '0.8rem', lineHeight: 1.2 }}>{product.coverText}</div>
          )}
        </div>

        {/* Info next to cover */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: 'var(--accent)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Book</p>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', textTransform: 'uppercase', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>{product.title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Author Name</p>
          <div className="star-rating">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
        </div>
      </div>
      
      <p className="review-text" style={{ fontSize: '0.95rem', flex: '1', marginBottom: '20px', color: 'var(--text-secondary)' }}>
        {product.miniReview}
      </p>

      <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginBottom: '15px' }}>Category</p>
      
      <a 
        href={product.amazonUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-outline"
        style={{ width: '100%' }}
        aria-label={`View ${product.title} on Amazon`}
      >
        Read Full Review
      </a>
    </article>
  );
};
