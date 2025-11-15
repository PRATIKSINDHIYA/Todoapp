import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi, resetPasswordSchema, ResetPasswordInput } from '../api/auth.api';
import FormInput from '../components/FormInput';
import './Auth.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
    },
  });

  const mutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        {mutation.isSuccess ? (
          <div className="success-message">
            <p>Password reset successful! Redirecting to sign in...</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <FormInput
                label="Reset Token"
                type="text"
                {...register('token')}
                error={errors.token?.message}
              />
              <FormInput
                label="New Password"
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
                {mutation.isPending ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
            <p className="auth-link">
              <Link to="/signin">Back to Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

