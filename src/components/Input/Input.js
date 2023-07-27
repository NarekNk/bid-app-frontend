import React from "react";
import css from "./Input.module.scss";
import cn from "classnames";

const Input = ({
  label,
  fieldName,
  placeholder,
  type,
  value,
  onChange,
  error = "",
  fullWidth = true,
}) => {
  const hasError = error.length > 0;

  return (
    <div
      className={cn(css.inputLabelWrapper, {
        [css.fullWidth]: fullWidth,
      })}
    >
      <label htmlFor={fieldName} className={css.label}>
        {label}
      </label>
      <input
        className={cn(css.input, { [css.hasError]: hasError })}
        type={type}
        id={fieldName}
        value={value}
        onChange={onChange}
        name={fieldName}
        placeholder={placeholder}
      />
      {hasError && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default Input;
