import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../assets/icons';
import api from '../../api/axios';
import './LoginPage.css';

const LoginPage = () => {
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();
  const isRegistering = authMode === 'register';

  // Form states
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        username: loginData.username,
        password: loginData.password,
      });

      if (response.data.success) {
        const { accessToken, refreshToken, user, permissions } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('permissions', JSON.stringify(permissions));
        
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/register', {
        full_name: registerData.full_name,
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });

      if (response.data.success) {
        // Switch to login page after successful registration
        setAuthMode('login');
        setRegisterData({
          full_name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        alert('Registration successful! Please sign in.');
      }
    } catch (err) {
      if (err.response?.data?.errors?.length > 0) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-shell">
        <section className="login-visual" aria-label="POS Cafe preview">
          <div className="login-hero-content">
            <div className="login-hero-logo">
              <Icons.Logo />
            </div>

            <h2>POS Cafe</h2>
            <p className="login-hero-subtitle">Point of Sale System</p>
            <span className="login-hero-rule" />

            <div className="login-hero-copy">
              <h3>Smart Billing. Happy Business.</h3>
              <p>All-in-one POS solution to streamline your cafe operations.</p>
            </div>

            <div className="login-feature-list">
              <div className="login-feature">
                <span><Icons.Billing /></span>
                <div>
                  <strong>Fast & Easy Billing</strong>
                  <p>Create bills in seconds.</p>
                </div>
              </div>
              <div className="login-feature">
                <span><Icons.Inventory /></span>
                <div>
                  <strong>Inventory Management</strong>
                  <p>Track stock in real time.</p>
                </div>
              </div>
              <div className="login-feature">
                <span><Icons.SalesReport /></span>
                <div>
                  <strong>Detailed Reports</strong>
                  <p>Insights to grow your business.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="login-panel" aria-labelledby="auth-title">
          <div className="login-dot-grid" aria-hidden="true">
            {Array.from({ length: 25 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="login-form-wrap">
            <div className="login-logo">
              <Icons.Logo />
            </div>

            {isRegistering ? (
              <>
                <h1 id="auth-title" className="register-title">Create Your Account</h1>
                <p className="login-subtitle">Join POS Cafe and start managing your business smarter.</p>

                {error && <div className="text-red-500 text-sm font-semibold mb-4 bg-red-100 p-2 rounded">{error}</div>}

                <form className="login-form register-form" onSubmit={handleRegister}>
                  <label className="login-field">
                    <span>Full Name</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.User />
                      </div>
                      <input 
                        type="text" 
                        name="full_name"
                        placeholder="Enter your full name" 
                        value={registerData.full_name}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Username</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.User />
                      </div>
                      <input 
                        type="text" 
                        name="username"
                        placeholder="Enter your username" 
                        value={registerData.username}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Email Address</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.Mail />
                      </div>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Enter your email address" 
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Password</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.Lock />
                      </div>
                      <input 
                        type="password" 
                        name="password"
                        placeholder="Create a password" 
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Confirm Password</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.Lock />
                      </div>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="Confirm your password" 
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </label>

                  <label className="login-checkbox register-terms">
                    <input type="checkbox" required />
                    <span className="login-checkmark">
                      <Icons.Check />
                    </span>
                    <span>
                      I agree to the <a href="#terms">Terms and Conditions</a> and <a href="#privacy">Privacy Policy</a>
                    </span>
                  </label>

                  <button type="submit" className="login-submit register-submit" disabled={loading}>
                    <Icons.Lock />
                    {loading ? 'Creating...' : 'Create Account'}
                  </button>
                </form>

                <div className="login-divider register-divider">
                  <span />
                  <strong>or</strong>
                  <span />
                </div>

                <p className="register-switch">
                  Already have an account?{' '}
                  <button type="button" onClick={() => { setAuthMode('login'); setError(''); }}>Sign In</button>
                </p>
              </>
            ) : (
              <>
                <h1 id="auth-title">Welcome Back!</h1>
                <p className="login-subtitle">Sign in to continue to POS Cafe</p>

                {error && <div className="text-red-500 text-sm font-semibold mb-4 bg-red-100 p-2 rounded">{error}</div>}

                <form className="login-form" onSubmit={handleLogin}>
                  <label className="login-field">
                    <span>Username</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.User />
                      </div>
                      <input 
                        type="text" 
                        name="username"
                        placeholder="Enter your username" 
                        value={loginData.username}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Password</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.Lock />
                      </div>
                      <input 
                        type="password" 
                        name="password"
                        placeholder="Enter your password" 
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                  </label>

                  <div className="login-options">
                    <label className="login-checkbox">
                      <input type="checkbox" />
                      <span className="login-checkmark">
                        <Icons.Check />
                      </span>
                      <span>Remember me</span>
                    </label>

                    <a href="#forgot-password">Forgot Password?</a>
                  </div>

                  <button type="submit" className="login-submit" disabled={loading}>
                    <Icons.Lock />
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>

                <div className="login-divider">
                  <span />
                  <strong>or</strong>
                  <span />
                </div>

                <button type="button" className="login-register" onClick={() => { setAuthMode('register'); setError(''); }}>
                  <Icons.Shield />
                  Register
                </button>
              </>
            )}
          </div>

          <p className="login-copyright">&copy; 2026 POS Cafe. All rights reserved.</p>
        </section>
      </section>
    </main>
  );
};

export default LoginPage;
