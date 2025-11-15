import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { authApi, signupSchema, SignupInput } from '../api/auth.api';
import FormInput from '../components/FormInput';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      setAuth(data.token, {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email || '',
      });
      navigate('/todos');
    },
  });

  const onSubmit = (data: SignupInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <FormInput
            label="Name"
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
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
            {mutation.isPending ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

