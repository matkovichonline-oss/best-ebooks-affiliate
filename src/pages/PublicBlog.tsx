import { AffiliateProductCard } from '../components/AffiliateProductCard';
import { useAffiliateProducts } from '../hooks/useAffiliateProducts';
import { Search, User, Star } from 'lucide-react';

export const PublicBlog = () => {
  const { products } = useAffiliateProducts();
  
  const featuredProduct = products.length > 0 ? products[0] : null;
  const gridProducts = products.length > 1 ? products.slice(1) : [];

  return (
    <div className="container">
      <header className="site-header glass-card">
        <h1 className="site-title">The Literary Leaf</h1>
        <p className="site-subtitle">Premium Book Reviews</p>
        
        <nav className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#">Reviews</a>
          <a href="#">Fiction</a>
          <a href="#">Non-Fiction</a>
          <a href="#">Essays</a>
          <button className="btn btn-outline" style={{ margin: '0 15px' }}>Join</button>
          <a href="#" aria-label="Search"><Search size={18} /></a>
          <a href="/admin" aria-label="Admin/Profile"><User size={18} /></a>
        </nav>
      </header>

      <main style={{ paddingBottom: '60px' }}>
        {featuredProduct && (
          <section className="featured-review glass-card editorial-card" style={{ marginBottom: '40px' }}>
            {/* Featured Image */}
            <div style={{
              flexShrink: 0,
              width: '260px',
              height: '380px',
              background: 'linear-gradient(135deg, #101510 0%, #0a100a 100%)',
              borderRadius: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              padding: '24px',
              textAlign: 'center',
              fontWeight: '400',
              fontFamily: 'var(--font-serif)',
              border: '1px solid var(--border)',
              fontSize: '1.4rem'
            }}>
              {featuredProduct.coverText}
            </div>

            {/* Featured Content */}
            <div style={{ flex: '1', minWidth: '300px' }}>
              <p style={{ color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: '500' }}>Featured Review</p>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textTransform: 'uppercase' }}>{featuredProduct.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
                by Author Name
              </p>
              
              <div className="star-rating" style={{ marginBottom: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '10px' }}>Star Rating:</span>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '10px' }}>Fiction</span>
              </div>

              <p className="review-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
                {featuredProduct.miniReview}
              </p>
              
              <a 
                href={featuredProduct.amazonUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline"
                aria-label={`Read review for ${featuredProduct.title} on Amazon`}
              >
                Read The Review
              </a>
            </div>
          </section>
        )}

        {gridProducts.length > 0 && (
          <section className="products-grid">
            {gridProducts.map(product => (
              <AffiliateProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};
