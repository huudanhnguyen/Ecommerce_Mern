// src/components/Avatar.jsx
import React from "react";

const Avatar = ({ 
  src, 
  alt, 
  name, 
  size = "md", 
  className = "",
  showBorder = false 
}) => {
  // Size classes
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm", 
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl",
    "2xl": "w-28 h-28 text-3xl"
  };

  // Get first letter of name
  const getInitial = () => {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (alt) {
      return alt.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Generate gradient color based on name
  const getGradientClass = () => {
    if (!name) return "from-gray-400 to-gray-600";
    
    const colors = [
      "from-blue-400 to-purple-500",
      "from-green-400 to-blue-500", 
      "from-pink-400 to-red-500",
      "from-yellow-400 to-orange-500",
      "from-purple-400 to-pink-500",
      "from-indigo-400 to-purple-500",
      "from-teal-400 to-green-500",
      "from-red-400 to-pink-500"
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full overflow-hidden 
        ${showBorder ? "border-2 border-gray-200" : ""}
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div 
          className={`
            w-full h-full 
            bg-gradient-to-br 
            ${getGradientClass()}
            flex items-center justify-center 
            text-white font-semibold
          `}
        >
          {getInitial()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
