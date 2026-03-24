import { useState } from 'react';
import { useAffiliateProducts } from '../hooks/useAffiliateProducts';
import { Pencil, Trash2, Plus, LogOut } from 'lucide-react';
import type { AffiliateProduct } from '../data/affiliateProducts';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAffiliateProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'books' | 'subscribers'>('books');
  const [subscribers, setSubscribers] = useState<{email: string, date: string}[]>(() => 
    JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]')
  );
  const [form, setForm] = useState<Omit<AffiliateProduct, 'id'>>({
    title: '', author: '', miniReview: '', amazonUrl: '', coverText: '', category: 'Mystery & Thriller', coverUrl: ''
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('affiliate_auth');
    navigate('/');
  };

  const deleteSubscriber = (email: string) => {
    const updated = subscribers.filter(s => s.email !== email);
    setSubscribers(updated);
    localStorage.setItem('newsletter_subscribers', JSON.stringify(updated));
  };

  const handleEdit = (product: AffiliateProduct) => {
    setEditingId(product.id);
    setForm(product);
  };

  const handleSave = () => {
    if (editingId) {
      updateProduct(editingId, form);
    } else {
      addProduct(form);
    }
    setEditingId(null);
    setForm({ title: '', author: '', miniReview: '', amazonUrl: '', coverText: '', category: 'Mystery & Thriller', coverUrl: '' });
  };

  return (
    <div className="admin-container" style={{ minHeight: '100vh', background: '#0a0d11', color: '#fff', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.8rem', letterSpacing: '1px' }}>ADMIN CONTROL PANEL</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn btn-outline" onClick={handleLogout} style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <LogOut size={18} /> LOGOUT
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-amazon">VIEW LIVE SITE</a>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button 
          onClick={() => setActiveTab('books')}
          style={{ 
            padding: '10px 20px', background: 'none', border: 'none', 
            color: activeTab === 'books' ? 'var(--accent)' : '#64748b',
            borderBottom: activeTab === 'books' ? '2px solid var(--accent)' : 'none',
            cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px'
          }}
        >
          BOOKS CATALOG
        </button>
        <button 
          onClick={() => {
            setActiveTab('subscribers');
            setSubscribers(JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]'));
          }}
          style={{ 
            padding: '10px 20px', background: 'none', border: 'none', 
            color: activeTab === 'subscribers' ? 'var(--accent)' : '#64748b',
            borderBottom: activeTab === 'subscribers' ? '2px solid var(--accent)' : 'none',
            cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px'
          }}
        >
          SUBSCRIBERS ({subscribers.length})
        </button>
      </div>

      {activeTab === 'books' ? (
        <>
          <div className="glass-card" style={{ marginBottom: '40px', padding: '30px', background: 'rgba(255,255,255,0.03)' }}>
            <h3 style={{ marginBottom: '5px' }}>{editingId ? 'Edit Recommended Book' : 'Add New Recommended Book'}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' }}>Focus on compelling review content and accurate Amazon tracking URLs.</p>
            
            <label className="admin-label">Book Category</label>
            <select className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value as any})} style={{ background: '#000', color: '#fff' }}>
              <option value="Mystery & Thriller">Mystery & Thriller</option>
              <option value="Personal Development">Personal Development</option>
              <option value="Science Fiction & Fantasy">Science Fiction & Fantasy</option>
            </select>
            
            <label className="admin-label">Cover Text (Fallback)</label>
            <input className="admin-input" value={form.coverText} onChange={e => setForm({...form, coverText: e.target.value})} placeholder="e.g. Atomic Habits" style={{ background: '#000', color: '#fff' }} />

            <label className="admin-label">Real Cover Image URL (Optional)</label>
            <input className="admin-input" value={form.coverUrl || ''} onChange={e => setForm({...form, coverUrl: e.target.value})} placeholder="https://covers.openlibrary.org/..." style={{ background: '#000', color: '#fff' }} />

            <label className="admin-label">Catchy Article Title</label>
            <input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. 5 Habits That Will Transform Your Year" style={{ background: '#000', color: '#fff' }} />
            
            <label className="admin-label">Author Name</label>
            <input className="admin-input" value={form.author} onChange={e => setForm({...form, author: e.target.value})} placeholder="e.g. James Clear" style={{ background: '#000', color: '#fff' }} />
            
            <label className="admin-label">Mini-Review (Endorsement)</label>
            <textarea className="admin-textarea" value={form.miniReview} onChange={e => setForm({...form, miniReview: e.target.value})} placeholder="Provide an authentic review..." style={{ background: '#000', color: '#fff' }} />
            
            <label className="admin-label">Amazon SiteStripe URL</label>
            <input className="admin-input" value={form.amazonUrl} onChange={e => setForm({...form, amazonUrl: e.target.value})} placeholder="https://amzn.to/..." style={{ background: '#000', color: '#fff' }} />
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-amazon" onClick={handleSave}>
                {editingId ? 'Save Changes' : <><Plus size={18} /> Add to Catalog</>}
              </button>
              {editingId && <button className="btn btn-outline" onClick={() => { setEditingId(null); setForm({ title: '', author: '', miniReview: '', amazonUrl: '', coverText: '', category: 'Mystery & Thriller', coverUrl: '' }); }}>Cancel</button>}
            </div>
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            {products.map(product => (
              <div key={product.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <h4 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>{product.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{product.amazonUrl}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-outline" style={{ padding: '8px', borderColor: 'rgba(255,255,255,0.1)' }} onClick={() => handleEdit(product)}><Pencil size={18} /></button>
                  <button className="btn btn-outline" style={{ padding: '8px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => deleteProduct(product.id)}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {subscribers.length > 0 ? subscribers.map((sub, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h4 style={{ marginBottom: '5px', color: '#fff' }}>{sub.email}</h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Joined on {new Date(sub.date).toLocaleDateString()}</p>
              </div>
              <button 
                className="btn btn-outline" 
                style={{ padding: '8px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }} 
                onClick={() => deleteSubscriber(sub.email)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          )) : (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ color: '#64748b' }}>No subscribers yet. Promote your newsletter on the main page!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
