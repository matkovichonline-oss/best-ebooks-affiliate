import { useState } from 'react';
import { useAffiliateProducts } from '../hooks/useAffiliateProducts';
import { Pencil, Trash2, Plus, LogOut } from 'lucide-react';
import type { AffiliateProduct } from '../data/affiliateProducts';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAffiliateProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<AffiliateProduct, 'id'>>({
    title: '', miniReview: '', amazonUrl: '', coverText: ''
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('affiliate_auth');
    navigate('/');
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
    setForm({ title: '', miniReview: '', amazonUrl: '', coverText: '' });
  };

  return (
    <div className="admin-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Affiliate Link Manager</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn btn-outline" onClick={handleLogout}><LogOut size={18} /> Logout</button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-amazon">View Live Site</a>
        </div>
      </div>

      <div className="editorial-card" style={{ marginBottom: '40px', background: '#f8fafc' }}>
        <h3>{editingId ? 'Edit Recommended Book' : 'Add New Recommended Book'}</h3>
        <p className="text-muted mb-4">Focus on compelling review content and accurate Amazon tracking URLs.</p>
        
        <label className="admin-label">Cover Text (Short Title for the Cover Art)</label>
        <input className="admin-input" value={form.coverText} onChange={e => setForm({...form, coverText: e.target.value})} placeholder="e.g. Atomic Habits" />

        <label className="admin-label">Catchy Article Title</label>
        <input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. 5 Habits That Will Transform Your Year" />
        
        <label className="admin-label">Mini-Review (Endorsement)</label>
        <textarea className="admin-textarea" value={form.miniReview} onChange={e => setForm({...form, miniReview: e.target.value})} placeholder="Provide an authentic, persuasive 2-3 sentence review that drives clicks..." />
        
        <label className="admin-label">Amazon SiteStripe URL (amzn.to)</label>
        <input className="admin-input" value={form.amazonUrl} onChange={e => setForm({...form, amazonUrl: e.target.value})} placeholder="https://amzn.to/..." />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-amazon" onClick={handleSave}>
            {editingId ? 'Save Changes' : <><Plus size={18} /> Add to Catalog</>}
          </button>
          {editingId && <button className="btn btn-outline" onClick={() => { setEditingId(null); setForm({ title: '', miniReview: '', amazonUrl: '', coverText: '' }); }}>Cancel</button>}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid var(--border)', borderRadius: '8px', background: 'white' }}>
            <div>
              <h4 style={{ marginBottom: '5px' }}>{product.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>{product.amazonUrl}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => handleEdit(product)}><Pencil size={18} /></button>
              <button className="btn btn-outline" style={{ padding: '8px', color: 'red', borderColor: 'red' }} onClick={() => deleteProduct(product.id)}><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p className="text-muted text-center">Your catalog is empty. Add a book above!</p>}
      </div>
    </div>
  );
};
