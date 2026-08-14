import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  showPassword,
  onToggle,
  error,
  autoComplete = "current-password",
}) {
  return (
    <label className="auth-field" htmlFor={id}>
      <span className="auth-field__label">{label}</span>
      <div className={`auth-field__control auth-field__control--password ${error ? "auth-field__control--error" : ""}`}>
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          className="auth-field__toggle"
          onClick={onToggle}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error ? <span className="auth-field__error">{error}</span> : null}
    </label>
  );
}
