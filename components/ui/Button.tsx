// components/ui/Button.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", size = "md", onClick, href, disabled = false, className = "", icon, iconPosition = "right" }) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 shadow-lg hover:shadow-xl",
    secondary: "bg-[#392E20] text-white hover:bg-[#4D3D2A] focus:ring-amber-500 shadow-lg hover:shadow-xl",
    outline: "border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white focus:ring-amber-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:bg-current hover:text-current";

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? disabledStyles : ""}
    ${className}
  `;

  const buttonContent = (
    <>
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.a href={href} className={buttonClasses} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button className={buttonClasses} onClick={onClick} disabled={disabled} whileHover={disabled ? {} : { scale: 1.02 }} whileTap={disabled ? {} : { scale: 0.98 }}>
      {buttonContent}
    </motion.button>
  );
};

export default Button;
