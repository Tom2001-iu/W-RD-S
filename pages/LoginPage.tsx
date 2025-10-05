import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-brand-black">
      <div className="container mx-auto px-6 flex justify-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-brand-gray shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-3xl font-bold text-white text-center mb-6">
              Log In
            </h1>
            
            {error && (
              <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-brand-light-gray text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-black border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-brand-light-gray text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-black border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-brand-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-500"
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </div>
            
            <p className="text-center text-brand-light-gray text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-white hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
