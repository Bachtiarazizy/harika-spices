import React from "react";

// Define types for button variants and sizes
type ButtonVariant = "primary" | "secondary" | "dark" | "primaryOutline" | "secondaryOutline" | "darkOutline";

type ButtonSize = "small" | "medium" | "large";

// Define the props interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", size = "medium", disabled = false, className = "", ...props }) => {
  // Base styles
  const baseStyles = "font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Size variants
  const sizeStyles: Record<ButtonSize, string> = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  // Color variants
  const variantStyles: Record<ButtonVariant, string> = {
    // Background variants (3)
    primary: "bg-[#4D3D2A] text-white hover:bg-gray-800 focus:ring-[#4D3D2A]",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    dark: "bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900",

    // Border variants (3)
    primaryOutline: "bg-transparent text-[#4D3D2A] border-2 border-[#4D3D2A] hover:bg-[#4D3D2A] hover:text-white focus:ring-[#4D3D2A]",
    secondaryOutline: "bg-transparent text-gray-900 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 focus:ring-gray-500",
    darkOutline: "bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900",
  };

  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  return (
    <button className={buttonStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
