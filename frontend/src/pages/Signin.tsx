import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { authApi, signinSchema, SigninInput } from '../api/auth.api';
import FormInput from '../components/FormInput';
import './Auth.css';

const Signin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.signin,
    onSuccess: (data) => {
      setAuth(data.token, {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email || '',
      });
      navigate('/todos');
    },
  });

  const onSubmit = (data: SigninInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <FormInput
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <FormInput
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          {mutation.error && (
            <div className="error-message">
              {(mutation.error as any)?.response?.data?.error ||
                'An error occurred'}
            </div>
          )}
          <button type="submit" className="auth-button" disabled={mutation.isPending}>
            {mutation.isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="auth-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;

