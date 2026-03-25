import { useState, useEffect } from 'react';
import { AffiliateProductCard } from '../components/AffiliateProductCard';
import { useAffiliateProducts } from '../hooks/useAffiliateProducts';
import { Search, User, Star } from 'lucide-react';
import type { BookCategory } from '../data/affiliateProducts';
import bgMystery from '../assets/bg-mystery.png';
import bgPersonal from '../assets/bg-personal.png';
import bgScifi from '../assets/bg-scifi.png';

export const PublicBlog = () => {
  const { products } = useAffiliateProducts();
  const [activeCategory, setActiveCategory] = useState<BookCategory>('Mystery & Thriller');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = [
    { name: 'Mystery & Thriller' as BookCategory, id: 'mystery', bg: `url("${bgMystery}")` },
    { name: 'Personal Development' as BookCategory, id: 'personal', bg: `url("${bgPersonal}")` },
    { name: 'Science Fiction & Fantasy' as BookCategory, id: 'scifi', bg: `url("${bgScifi}")` }
  ].map(cat => ({
    ...cat,
    products: products.filter(p => p.category === cat.name)
  }));

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollPosition = currentY + window.innerHeight / 2.5;

      // Category detection
      for (let i = categories.length - 1; i >= 0; i--) {
        const section = document.getElementById(categories[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].name);
          break;
        }
      }

      // Nav hide on scroll down, show on scroll up
      if (currentY > 120) {
        setShowNav(currentY < lastScrollY);
        setShowTopBtn(true);
      } else {
        setShowNav(true);
        setShowTopBtn(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Fixed Cross-Fading Backgrounds — each layer fades independently for smooth dissolve */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, backgroundColor: '#06090c' }}>
        {[
          { name: 'Mystery & Thriller' as BookCategory, img: bgMystery },
          { name: 'Personal Development' as BookCategory, img: bgPersonal },
          { name: 'Science Fiction & Fantasy' as BookCategory, img: bgScifi },
        ].map(({ name, img }) => (
          <div
            key={name}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url("${img}")`,
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              opacity: activeCategory === name ? 0.65 : 0,
              transition: 'opacity 1.8s ease-in-out',
            }}
          />
        ))}
        {/* Soft gradient overlay for text readability */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(6,9,12,0.3) 0%, rgba(6,9,12,0.6) 100%)',
          pointerEvents: 'none',
        }} />
      </div>


      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <header className="site-header glass-card" style={{ position: 'sticky', top: '20px', zIndex: 10, padding: '20px 40px', margin: '20px auto 40px', transform: showNav ? 'translateY(0)' : 'translateY(-140%)', transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)', opacity: showNav ? 1 : 0 }}>
          <h1 className="site-title" style={{ fontSize: '1.8rem', letterSpacing: '2px' }}>The Best Books</h1>
          
          <nav className="nav-links" style={{ paddingTop: '15px' }}>
            {categories.map(cat => (
              <a 
                key={cat.id} 
                href={`#${cat.id}`} 
                className={activeCategory === cat.name ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {cat.name}
              </a>
            ))}
            <button className="btn btn-outline" style={{ margin: '0 15px' }}>Join</button>
            <a href="#" aria-label="Search"><Search size={18} /></a>
            <a href="/admin" aria-label="Admin/Profile"><User size={18} /></a>
          </nav>
        </header>

        <main style={{ paddingBottom: '60px' }}>
          {categories.map(({ name, id, products }) => {
            if (products.length === 0) return null;
            const featuredProduct = products[0];
            const gridProducts = products.slice(1);

            return (
              <section key={id} id={id} style={{ minHeight: '100vh', paddingTop: '40px', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                  {name} Top Picks
                </h2>

                <article className="featured-review glass-card editorial-card" style={{ marginBottom: '40px' }}>
                  <div style={{
                    flexShrink: 0, width: '260px', height: '380px', borderRadius: '8px', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)', border: '1px solid var(--border)',
                    overflow: 'hidden', background: '#0a100a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'
                  }}>
                    {featuredProduct.coverUrl ? (
                       <img src={featuredProduct.coverUrl} alt={featuredProduct.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                       <div style={{ padding: '24px', textAlign: 'center', color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>{featuredProduct.coverText}</div>
                    )}
                  </div>

                  <div style={{ flex: '1', minWidth: '300px' }}>
                    <p style={{ color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: '500' }}>Featured Review</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textTransform: 'uppercase' }}>{featuredProduct.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>by {featuredProduct.author}</p>
                    
                    <div className="star-rating" style={{ marginBottom: '20px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '10px', fontFamily: 'var(--font-serif)' }}>Rating:</span>
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '10px' }}>{featuredProduct.category}</span>
                    </div>

                    <p className="review-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
                      {featuredProduct.miniReview}
                    </p>
                    
                    <a href={featuredProduct.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label={`Read review for ${featuredProduct.title} on Amazon`}>
                      Read The Review
                    </a>
                  </div>
                </article>

                {gridProducts.length > 0 && (
                  <div className="products-grid">
                    {gridProducts.map(product => (
                      <AffiliateProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </main>

        {/* NEWSLETTER SECTION */}
        <section className="newsletter-section glass-card" style={{ margin: '80px auto', maxWidth: '800px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px' }}>Join The Reader's Club</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.1rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            Receive our weekly curated top picks and exclusive literary deals straight to your inbox.
          </p>
          
          {!subscribed ? (
            <form 
            onSubmit={async (e) => {
                e.preventDefault();
                if (!email) return;
                try {
                  // Add to Brevo list
                  await fetch('https://api.brevo.com/v3/contacts', {
                    method: 'POST',
                    headers: {
                      'api-key': import.meta.env.VITE_BREVO_API_KEY,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email,
                      listIds: [3],
                      updateEnabled: true,
                    }),
                  });
                } catch (_) { /* silent fail - still save locally */ }
                // Also save locally for Admin dashboard
                const existing = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
                localStorage.setItem('newsletter_subscribers', JSON.stringify([...existing, { email, date: new Date().toISOString() }]));
                setSubscribed(true);
                setEmail('');
              }}
              style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto' }}
            >
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                  letterSpacing: '1px'
                }}
              />
              <button 
                type="submit"
                className="btn btn-outline"
                style={{
                  padding: '12px 30px',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="success-message" style={{ color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>
              ✨ WELCOME TO THE CLUB! CHECK YOUR INBOX SOON.
            </div>
          )}
        </section>

        <footer className="glass-card text-center" style={{ padding: '30px', marginTop: '40px', marginBottom: '20px' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} The Best Books.
            <br />
            <em style={{ opacity: 0.7 }}>Amazon Associates Disclaimer: As an Amazon Associate, I earn from qualifying purchases.</em>
          </p>
        </footer>
      </div>

      {/* Floating Back to Top Button */}
      <button
        id="back-to-top"
        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 100,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), #b8882a)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(212,165,55,0.4)',
          opacity: showTopBtn ? 1 : 0,
          transform: showTopBtn ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: showTopBtn ? 'auto' : 'none',
          fontSize: '1.4rem',
          color: '#0a0d11',
          fontWeight: 'bold',
          lineHeight: 1,
        }}
      >
        ↑
      </button>
    </>
  );
};
