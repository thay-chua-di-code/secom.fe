import { Eye, EyeOff, Search, X } from "lucide-react";

import { useState } from "react";

import "./style.scss";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  required = false,
  error = "",
  icon,
  className = "",
  inputClassName = "",
  clearable = false,
  min,
  max,
  onKeyDown,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const currentType = isPassword ? (showPassword ? "text" : "password") : type;

  const Icon = icon;

  const handleClear = () => {
    onChange?.({
      target: {
        name,
        value: "",
      },
    });
  };

  return (
    <div className={`custom-input w-full ${className}`}>
      {/* LABEL */}
      {label && (
        <label className="custom-input__label">
          {label}

          {required && <span className="required">*</span>}
        </label>
      )}

      {/* INPUT */}
      <div
        className={`custom-input__wrapper ${
          error ? "error" : ""
        } ${disabled ? "disabled" : ""}`}
      >
        {/* LEFT ICON */}
        {Icon && (
          <div className="custom-input__icon">
            <Icon size={18} />
          </div>
        )}

        {/* FIELD */}
        <input
          type={currentType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          onKeyDown={onKeyDown}
          className={`custom-input__field ${inputClassName}`}
          {...props}
        />

        {/* CLEAR BUTTON */}
        {clearable && value && !isPassword && (
          <button
            type="button"
            onClick={handleClear}
            className="custom-input__action"
          >
            <X size={16} />
          </button>
        )}

        {/* PASSWORD TOGGLE */}
        {isPassword && (
          <button
            type="button"
            className="custom-input__action"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* ERROR */}
      {error && <p className="custom-input__error">{error}</p>}
    </div>
  );
};

export default Input;
