import { InputHTMLAttributes, forwardRef } from 'react';
import './FormInput.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="form-input-group">
        <label className="form-label">{label}</label>
        <input ref={ref} className={`form-input ${error ? 'error' : ''}`} {...props} />
        {error && <span className="form-error">{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;

