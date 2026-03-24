import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicBlog } from './pages/PublicBlog';
import { AdminDashboard } from './pages/AdminDashboard';
import { useState } from 'react';

const LoginAndAdminRoute = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const isAuthenticated = localStorage.getItem('affiliate_auth') === 'true';

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('affiliate_auth', 'true');
      window.location.reload();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="admin-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="editorial-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px' }}>Admin Access</h2>
        <p className="text-muted mb-4">Enter the portal password to manage affiliate content.</p>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            className="admin-input" 
            placeholder="Password..."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '15px' }}>{error}</p>}
          <button type="submit" className="btn btn-amazon" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicBlog />} />
        <Route path="/admin" element={<LoginAndAdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
