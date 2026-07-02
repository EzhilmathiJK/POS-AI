import { useState } from 'react';
import { Icons } from '../../assets/icons';
import './LoginPage.css';

const LoginPage = () => {
  const [authMode, setAuthMode] = useState('login');
  const isRegistering = authMode === 'register';

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

                <form className="login-form register-form" onSubmit={(event) => event.preventDefault()}>
                  <label className="login-field">
                    <span>Full Name</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.User />
                      </div>
                      <input type="text" placeholder="Enter your full name" />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Username</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.User />
                      </div>
                      <input type="text" placeholder="Enter your username" />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Email Address</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.Mail />
                      </div>
                      <input type="email" placeholder="Enter your email address" />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Password</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.Lock />
                      </div>
                      <input type="password" placeholder="Create a password" />
                      <button type="button" className="login-password-toggle" aria-label="Show password">
                        <Icons.EyeOff />
                      </button>
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Confirm Password</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.Lock />
                      </div>
                      <input type="password" placeholder="Confirm your password" />
                      <button type="button" className="login-password-toggle" aria-label="Show password">
                        <Icons.EyeOff />
                      </button>
                    </div>
                  </label>

                  <label className="login-checkbox register-terms">
                    <input type="checkbox" />
                    <span className="login-checkmark">
                      <Icons.Check />
                    </span>
                    <span>
                      I agree to the <a href="#terms">Terms and Conditions</a> and <a href="#privacy">Privacy Policy</a>
                    </span>
                  </label>

                  <button type="submit" className="login-submit register-submit">
                    <Icons.Lock />
                    Create Account
                  </button>
                </form>

                <div className="login-divider register-divider">
                  <span />
                  <strong>or</strong>
                  <span />
                </div>

                <p className="register-switch">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setAuthMode('login')}>Sign In</button>
                </p>
              </>
            ) : (
              <>
                <h1 id="auth-title">Welcome Back!</h1>
                <p className="login-subtitle">Sign in to continue to POS Cafe</p>

                <form className="login-form" onSubmit={(event) => event.preventDefault()}>
                  <label className="login-field">
                    <span>Username</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.User />
                      </div>
                      <input type="text" placeholder="Enter your username" />
                    </div>
                  </label>

                  <label className="login-field">
                    <span>Password</span>
                    <div className="login-input-wrap">
                      <div className="login-input-icon">
                        <Icons.Lock />
                      </div>
                      <input type="password" placeholder="Enter your password" />
                      <button type="button" className="login-password-toggle" aria-label="Show password">
                        <Icons.EyeOff />
                      </button>
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

                  <button type="submit" className="login-submit">
                    <Icons.Lock />
                    Sign In
                  </button>
                </form>

                <div className="login-divider">
                  <span />
                  <strong>or</strong>
                  <span />
                </div>

                <button type="button" className="login-register" onClick={() => setAuthMode('register')}>
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
