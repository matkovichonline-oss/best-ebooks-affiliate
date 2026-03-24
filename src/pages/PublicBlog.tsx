import { AffiliateProductCard } from '../components/AffiliateProductCard';
import { useAffiliateProducts } from '../hooks/useAffiliateProducts';
import { BookOpen } from 'lucide-react';

export const PublicBlog = () => {
  const { products } = useAffiliateProducts();

  return (
    <div className="container">
      <header className="site-header glass-card" style={{ padding: '60px 20px', borderRadius: '0 0 24px 24px' }}>
        <BookOpen size={64} color="var(--accent)" style={{ marginBottom: '20px' }} />
        <h1 className="site-title">The Best Books Ever</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginTop: '15px', maxWidth: '600px', margin: '15px auto 0' }}>
          Curated reviews of life-changing books. We read them so you know exactly what to buy.
        </p>
      </header>

      <main style={{ paddingBottom: '60px' }}>
        {products.map(product => (
          <AffiliateProductCard key={product.id} product={product} />
        ))}
      </main>

      <footer className="text-center glass-card" style={{ padding: '40px 20px', borderRadius: '24px 24px 0 0', marginTop: '40px' }}>
        <p className="text-muted" style={{ fontSize: '0.95rem' }}>
          © {new Date().getFullYear()} The Best Books Ever. 
          <br/>
          <em style={{ opacity: 0.7 }}>As an Amazon Associate I earn from qualifying purchases.</em>
        </p>
      </footer>
    </div>
  );
};
