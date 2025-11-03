import React from "react";
import { Link } from "react-router-dom";
import LogoLight from "/images/LogoLight.png";
import LogoDark from "/images/LogoDark.png";
import { useTheme } from "@/hooks/use-theme";

interface LogoProps {
  isDarkZone?: boolean; 
}

const Logo: React.FC<LogoProps> = ({ isDarkZone = false }) => {
  const { theme } = useTheme();

  // determine witch logo we'll use when we have two logo for each mode light and dark
  const isDarkMode = theme === "dark" || (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  const logoSrc = isDarkMode || isDarkZone ?  "/images/LogoDark.png" : "/images/LogoLight.png";


  return (
    <Link to="/" className="select-none inline-block ">
      <img
        src={logoSrc}
        alt="Logo nowait"
        className="w-1/2 h-1/4 "
      />
    </Link>
  );
};

export default Logo;
