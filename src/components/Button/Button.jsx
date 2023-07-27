import React from "react";
import css from "./Button.module.scss";
import cn from "classnames";

const Button = ({ children, onClick, type, variant = "primary" }) => {
  return (
    <button
      className={cn(css.button, {
        [css.primary]: variant === "primary",
        [css.secondary]: variant === "secondary",
      })}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
