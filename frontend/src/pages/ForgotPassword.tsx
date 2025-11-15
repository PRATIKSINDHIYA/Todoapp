import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi, forgotPasswordSchema, ForgotPasswordInput } from '../api/auth.api';
import FormInput from '../components/FormInput';
import './Auth.css';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.forgotPassword,
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>
        {mutation.isSuccess ? (
          <div className="success-message">
            <p>If an account exists with this email, a password reset link has been sent.</p>
            {mutation.data && 'resetToken' in mutation.data && (
              <p className="reset-token">
                Reset Token: {(mutation.data as any).resetToken}
                <br />
                <small>(In production, this would be sent via email)</small>
              </p>
            )}
            <Link to="/signin" className="auth-link-button">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <FormInput
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
              {mutation.error && (
                <div className="error-message">
                  {(mutation.error as any)?.response?.data?.error ||
                    'An error occurred'}
                </div>
              )}
              <button type="submit" className="auth-button" disabled={mutation.isPending}>
                {mutation.isPending ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <p className="auth-link">
              Remember your password? <Link to="/signin">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

