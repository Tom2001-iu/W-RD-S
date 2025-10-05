import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (!email || !password) {
      return setError('Please fill in all fields.');
    }

    setLoading(true);
    try {
      await signup(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account.');
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
              Create an Account
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
            
            <div className="mb-4">
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

             <div className="mb-6">
              <label className="block text-brand-light-gray text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="******************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-brand-black border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-brand-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-500"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
            
            <p className="text-center text-brand-light-gray text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-white hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
