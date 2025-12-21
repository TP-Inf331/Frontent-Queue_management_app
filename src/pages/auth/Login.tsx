import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useApi } from '@/hooks/useApi';
import { Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loading, execute: login } = useApi(authService.login, {
    successMessage: 'Successfully logged in!',
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      // Redirect based on role
      if (data.user.role === 'admin' || data.user.role === 'agent') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <Helmet>
        <title>Login - NoWait</title>
        <meta name="description" content="Sign in to your account." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
              Sign in to NoWait
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Access your queues and tickets
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background transition-all"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" id="label-password" className="block text-sm font-medium text-foreground mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/auth/forgot-password" shader-id="forgot-password" className="font-medium text-primary hover:text-primary/80">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign in'}
              </button>
            </div>

            <div className="text-sm text-center">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/auth/register" className="font-medium text-primary hover:text-primary/80">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
