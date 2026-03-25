import { useState, useEffect } from 'react';
import { Search, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VlogPost {
  id: string;
  date: string;
  bookId: string;
  title: string;
  content: string;
  amazonUrl: string;
  homeUrl: string;
}

export const VlogList = () => {
  const [posts, setPosts] = useState<VlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVlogs = async () => {
      try {
        const response = await fetch('https://best-books-content-engine.matkovichonline.workers.dev');
        const data = await response.json();
        // The worker currently returns just one "latest" post or we can expand it
        setPosts(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Failed to fetch vlogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVlogs();
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, backgroundColor: '#06090c' }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <header className="site-header glass-card" style={{ position: 'sticky', top: '20px', zIndex: 10, padding: '20px 40px', margin: '20px auto 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <ArrowLeft size={20} /> Back to Store
            </Link>
            <h1 className="site-title" style={{ fontSize: '1.5rem', letterSpacing: '2px', margin: 0 }}>The Daily Vlog</h1>
            <div className="nav-links" style={{ display: 'flex', gap: '20px' }}>
               <a href="#" aria-label="Search"><Search size={18} /></a>
               <a href="/admin" aria-label="Admin/Profile"><User size={18} /></a>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
          {loading ? (
            <div className="text-center" style={{ padding: '100px', color: 'var(--accent)' }}>
              <div className="loading-spinner">✨ Generating Daily Wisdom...</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-card text-center" style={{ padding: '60px' }}>
              <h2 style={{ color: '#fff' }}>No reviews found... yet.</h2>
              <p className="text-muted">We are currently drafting our first masterpiece. Check back tomorrow!</p>
            </div>
          ) : (
            posts.map(post => (
              <article key={post.id} className="glass-card" style={{ padding: '50px', marginBottom: '40px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px' }}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '30px', fontFamily: 'var(--font-serif)' }}>{post.title}</h2>
                
                <div 
                  className="vlog-content" 
                  style={{ 
                    color: 'rgba(255,255,255,0.85)', 
                    lineHeight: '1.8', 
                    fontSize: '1.1rem',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  {post.content}
                </div>

                <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a 
                      href={post.amazonUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn"
                      style={{ background: 'var(--accent)', color: '#000', padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold' }}
                    >
                      Buy on Amazon
                    </a>
                    <Link to="/" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Visit Storefront</Link>
                </div>
              </article>
            ))
          )}
        </main>

        <footer className="glass-card text-center" style={{ padding: '30px', marginBottom: '20px' }}>
           <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} The Best Books — Daily Insights.
          </p>
        </footer>
      </div>
    </>
  );
};
