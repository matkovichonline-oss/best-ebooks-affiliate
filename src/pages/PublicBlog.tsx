import { AffiliateProductCard } from '../components/AffiliateProductCard';
import { useAffiliateProducts } from '../hooks/useAffiliateProducts';
import { BookOpen } from 'lucide-react';

export const PublicBlog = () => {
  const { products } = useAffiliateProducts();

  return (
    <div className="container">
      <header className="site-header">
        <BookOpen size={48} color="var(--accent)" style={{ marginBottom: '15px' }} />
        <h1 className="site-title">The Best Books Ever</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
          Curated reviews of life-changing books. We read them so you know exactly what to buy.
        </p>
      </header>

      <main>
        {products.map(product => (
          <AffiliateProductCard key={product.id} product={product} />
        ))}
      </main>

      <footer className="text-center" style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '40px' }}>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} The Best Books Ever. 
          <br/>
          <em>As an Amazon Associate I earn from qualifying purchases.</em>
        </p>
      </footer>
    </div>
  );
};
