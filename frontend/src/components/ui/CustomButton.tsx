import React from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    color?: "green" 
    variant?: "filled" | "outlined";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    color = "green",
    variant = "filled",
    className = "",
}) => {
    const colorClasses: Record<string, string> = {
        green: "bg-[#4FAD5B] hover:bg-green-800 border-green-500 text-white",
    };

    const outlinedClasses: Record<string, string> = {
        green: "border border-green-500 text-green-500 hover:bg-green-100",
    };

    const buttonStyle = variant === "filled" ? colorClasses[color] : outlinedClasses[color];

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all ${buttonStyle} ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
