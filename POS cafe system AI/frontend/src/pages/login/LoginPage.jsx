import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../assets/icons';
import api from '../../api/axios';
import { useAppContext } from '../../context/AppContext';
import { encrypt } from '../../utils/encryption';
import { decodeToken } from '../../utils/jwt';

const FormField = ({ label, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="block mb-[10px] text-[13px] leading-[16px] font-semibold text-[#0b0d34]">{label}</span>
    {children}
  </label>
);

const InputWrap = ({ icon, type = 'text', name, placeholder, value, onChange, required }) => (
  <div
    className="h-[41px] grid items-center border border-[#deddf6] rounded-[8px] bg-white overflow-hidden"
    style={{ gridTemplateColumns: '54px 1fr' }}
  >
    <div className="h-full flex items-center justify-center bg-[#f8f7ff] text-[#7773a8] text-[17px]">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="min-w-0 h-full border-0 outline-none px-[12px] text-[#0b0d34] text-[12px] font-normal bg-transparent placeholder:text-[#7773a8]"
    />
  </div>
);

const Checkmark = ({ checked, className = '' }) => (
  <span
    className={`w-[13px] h-[13px] rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${checked ? 'bg-[#5b31ee] border-[#5b31ee] text-white' : 'bg-white border-[#9b9ab1] text-transparent'
      } ${className}`}
  >
    <svg viewBox="0 0 10 10" className="w-[10px] h-[10px]" strokeWidth={3} stroke="currentColor" fill="none">
      <polyline points="1.5,5 4,7.5 8.5,2" />
    </svg>
  </span>
);

const SubmitButton = ({ loading, loadingLabel, defaultLabel, className = '' }) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-full h-[41px] border-0 rounded-[6px] text-white flex items-center justify-center gap-[16px] text-[12px] leading-[16px] font-bold cursor-pointer disabled:opacity-70 transition-opacity ${className}`}
    style={{
      background: 'linear-gradient(90deg, #4d27ef 0%, #7d32f3 100%)',
      boxShadow: '0 12px 24px rgba(91,49,238,0.18)',
    }}
  >
    <Icons.Lock className="w-[16px] h-[16px]" />
    {loading ? loadingLabel : defaultLabel}
  </button>
);

const Divider = ({ className = '' }) => (
  <div
    className={`w-full grid items-center gap-[15px] text-[#8a84b3] text-[12px] leading-[15px] font-bold ${className}`}
    style={{ gridTemplateColumns: '1fr auto 1fr' }}
  >
    <span className="h-px bg-[#deddf6]" />
    <strong>or</strong>
    <span className="h-px bg-[#deddf6]" />
  </div>
);


const LoginPage = () => {
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();

  const { settings, setCurrentUser, setCurrentPermissions, showToast } = useAppContext();
  const isRegistering = authMode === 'register';

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    full_name: '', username: '', email: '', password: '', confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const error = params.get('error');

    if(error) {
      setError(error);
      navigate("/login", {replace: true});

      return;
    }

    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const decoded = decodeToken(accessToken);

      setCurrentUser({
        id: decoded.userId,
        username: decoded.username,
        fullname: decoded.fullname,
        role: decoded.role
      });

      setCurrentPermissions(decoded.permissions);

      window.history.replaceState({}, document.title, '/');

      navigate('/dashboard', { replace: true });
    }
  }, [navigate, setCurrentUser, setCurrentPermissions]);

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        username: encrypt(loginData.username),
        password: encrypt(loginData.password),
      });
      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        const decoded = decodeToken(accessToken);
        setCurrentUser({ id: decoded.userId, username: decoded.username, fullname: decoded.fullname, role: decoded.role });
        setCurrentPermissions(decoded.permissions);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login`;
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
        setAuthMode('login');
        setRegisterData({ full_name: '', username: '', email: '', password: '', confirmPassword: '' });
        showToast('Registration successful! Please sign in.', 'success');
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

  const switchToRegister = () => { setAuthMode('register'); setError(''); };
  const switchToLogin = () => { setAuthMode('login'); setError(''); };

  return (
    <main className="min-h-screen w-full bg-white overflow-hidden text-[#0b0d34]">
      <div className="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* ── Left visual hero panel ── */}
        <div
          className="hidden lg:block relative overflow-hidden text-white"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(7,8,35,0.88) 0%, rgba(10,8,42,0.82) 30%, rgba(10,8,42,0.45) 63%, rgba(10,8,42,0.14) 100%), url('/authbanner.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute left-9 top-[90px] w-[300px]">
            {/* Logo */}
            <div
              className="w-[73px] h-[73px] rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(145deg, #7e3cff 0%, #512bea 78%)', boxShadow: '0 14px 28px rgba(91,49,238,0.25)' }}
            >
              {settings?.logo && settings.logo !== '/default-image.png' ? (
                <img src={settings.logo} alt="Logo" className="w-[37px] h-[37px] object-contain invert brightness-0" />
              ) : (
                <Icons.Logo className="text-[37px] text-white" />
              )}
            </div>

            <h2 className="mt-[29px] text-[40px] leading-[48px] font-bold">{settings?.cafeName || 'POS Cafe'}</h2>
            <p className="mt-[5px] text-[20px] leading-[26px] font-bold">Point of Sale System</p>

            <span className="block w-[40px] h-[3px] rounded-[8px] bg-[#7b45ff] mt-[31px]" />

            <div className="mt-[30px]">
              <h3 className="text-[18px] leading-[23px] font-bold">Smart Billing. Happy Business.</h3>
              <p className="w-[255px] mt-[13px] text-[14px] leading-[21px] font-normal">
                All-in-one POS solution to streamline your cafe operations.
              </p>
            </div>

            <div className="mt-[36px] grid gap-[24px]">
              {[
                { icon: <Icons.Billing />, title: 'Fast & Easy Billing', desc: 'Create bills in seconds.' },
                { icon: <Icons.Inventory />, title: 'Inventory Management', desc: 'Track stock in real time.' },
                { icon: <Icons.SalesReport />, title: 'Detailed Reports', desc: 'Insights to grow your business.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="grid gap-[13px] items-center" style={{ gridTemplateColumns: '37px 1fr' }}>
                  <span
                    className="w-[37px] h-[37px] rounded-full flex items-center justify-center text-white text-[18px]"
                    style={{ background: 'rgba(91,49,238,0.72)' }}
                  >
                    {icon}
                  </span>
                  <div>
                    <strong className="block text-[14px] leading-[17px] font-bold">{title}</strong>
                    <p className="mt-[6px] text-[12px] leading-[15px] font-normal">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="relative flex flex-col items-center overflow-x-hidden overflow-y-auto bg-white">

          {/* Dot grid decoration */}
          <div
            className="absolute right-6 top-[23px] w-[56px] grid gap-[11px] opacity-[0.28]"
            style={{ gridTemplateColumns: 'repeat(5, 5px)' }}
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} className="w-[5px] h-[5px] rounded-full bg-[#b9aef7]" />
            ))}
          </div>

          {/* Form card */}
          <div className="w-[min(520px,calc(100%-160px))] sm:w-[min(400px,calc(100%-40px))] lg:w-[min(520px,calc(100%-160px))] mt-[82px] flex flex-col items-center relative z-10">

            {/* Logo circle */}
            <div
              className="w-[73px] h-[73px] rounded-full flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(145deg, #8b42ff 0%, #542bed 78%)', boxShadow: '0 16px 35px rgba(91,49,238,0.24)' }}
            >
              {settings?.logo && settings.logo !== '/default-image.png' ? (
                <img src={settings.logo} alt="Logo" className="w-[38px] h-[38px] object-contain invert brightness-0" />
              ) : (
                <Icons.Logo className="text-[32px]" />
              )}
            </div>

            {isRegistering ? (
              <>
                <h1 className="mt-[20px] text-[20px] leading-[25px] font-bold text-[#0b0d34]">Create Your Account</h1>
                <p className="mt-[8px] text-[12px] leading-[18px] font-semibold text-[#807aa8]">
                  Join {settings?.cafeName} and start managing your business smarter.
                </p>

                {error && <ErrorBox message={error} />}

                <form className="w-full mt-[23px]" onSubmit={handleRegister}>
                  <FormField label="Full Name">
                    <InputWrap icon={<Icons.User />} type="text" name="full_name" placeholder="Enter your full name" value={registerData.full_name} onChange={handleRegisterChange} required />
                  </FormField>
                  <FormField label="Username" className="mt-[18px]">
                    <InputWrap icon={<Icons.User />} type="text" name="username" placeholder="Enter your username" value={registerData.username} onChange={handleRegisterChange} required />
                  </FormField>
                  <FormField label="Email Address" className="mt-[18px]">
                    <InputWrap icon={<Icons.Mail />} type="email" name="email" placeholder="Enter your email address" value={registerData.email} onChange={handleRegisterChange} required />
                  </FormField>
                  <FormField label="Password" className="mt-[18px]">
                    <InputWrap icon={<Icons.Lock />} type="password" name="password" placeholder="Create a password" value={registerData.password} onChange={handleRegisterChange} required />
                  </FormField>
                  <FormField label="Confirm Password" className="mt-[18px]">
                    <InputWrap icon={<Icons.Lock />} type="password" name="confirmPassword" placeholder="Confirm your password" value={registerData.confirmPassword} onChange={handleRegisterChange} required />
                  </FormField>

                  {/* Terms */}
                  <label className="mt-[17px] w-full inline-flex items-start gap-[8px] cursor-pointer text-[#7773a8] text-[12px] leading-[15px] font-semibold">
                    <input type="checkbox" className="absolute opacity-0 pointer-events-none" checked={checkedTerms} onChange={() => setCheckedTerms(p => !p)} required />
                    <Checkmark checked={checkedTerms} className="mt-[1px]" />
                    <span>
                      I agree to the{' '}
                      <a href="#terms" className="text-[#5b31ee] no-underline font-semibold">Terms and Conditions</a>
                      {' '}and{' '}
                      <a href="#privacy" className="text-[#5b31ee] no-underline font-semibold">Privacy Policy</a>
                    </span>
                  </label>

                  <SubmitButton loading={loading} loadingLabel="Creating..." defaultLabel="Create Account" className="mt-[23px]" />
                </form>

                <Divider className="mt-[22px]" />

                <p className="mt-[20px] text-[#8a84b3] text-[12px] leading-[15px] font-semibold">
                  Already have an account?{' '}
                  <button type="button" className="text-[#5b31ee] font-semibold bg-transparent border-0 p-0 cursor-pointer" onClick={switchToLogin}>
                    Sign In
                  </button>
                </p>
              </>
            ) : (
              <>
                <h1 className="mt-[23px] text-[24px] leading-[30px] font-bold text-[#0b0d34]">Welcome Back!</h1>
                <p className="mt-[8px] text-[12px] leading-[18px] font-semibold text-[#807aa8]">
                  Sign in to continue to {settings?.cafeName}
                </p>

                {error && <ErrorBox message={error} />}

                <form className="w-full mt-[37px]" onSubmit={handleLogin}>
                  <FormField label="Username">
                    <InputWrap icon={<Icons.User />} type="text" name="username" placeholder="Enter your username" value={loginData.username} onChange={handleLoginChange} required />
                  </FormField>
                  <FormField label="Password" className="mt-[28px]">
                    <InputWrap icon={<Icons.Lock />} type="password" name="password" placeholder="Enter your password" value={loginData.password} onChange={handleLoginChange} required />
                  </FormField>

                  <div className="mt-[20px] flex items-center justify-between text-[#7773a8] text-[12px] leading-[14px] font-semibold">
                    <label className="inline-flex items-center gap-[8px] cursor-pointer">
                      <input type="checkbox" className="absolute opacity-0 pointer-events-none" checked={rememberMe} onChange={() => setRememberMe(p => !p)} />
                      <Checkmark checked={rememberMe} />
                      <span>Remember me</span>
                    </label>
                    <a href="#forgot-password" className="text-[#5b31ee] no-underline font-semibold">Forgot Password?</a>
                  </div>

                  <SubmitButton loading={loading} loadingLabel="Signing In..." defaultLabel="Sign In" className="mt-[30px]" />
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="mt-[18px] w-full h-[43px] border border-[#deddf6] rounded-[6px] bg-white flex items-center justify-center gap-3 text-[13px] font-semibold hover:bg-gray-50"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>
                </form>

                <Divider className="mt-[27px]" />

                <button
                  type="button"
                  onClick={switchToRegister}
                  className="mt-[27px] w-full h-[43px] border border-[#5b31ee] rounded-[6px] bg-white text-[#5b31ee] flex items-center justify-center gap-[14px] text-[12px] leading-[18px] font-bold cursor-pointer hover:bg-[#f5f3ff] transition-colors"
                >
                  <Icons.Shield className="w-[15px] h-[15px]" />
                  Register
                </button>
              </>
            )}

            <p className="relative mt-[42px] mb-[32px] text-[12px] leading-[15px] text-[#8a84b3] z-10">
              &copy; {new Date().getFullYear()} {settings?.cafeName}. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

const ErrorBox = ({ message }) => (
  <div className="w-full mt-4 text-red-500 text-[13px] font-semibold bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
    {message}
  </div>
);

export default LoginPage;
