import React from "react";
import { HashLoader } from "react-spinners";

type SpinnerProps = {
  size?: number; // tamaño del spinner
  color?: string; // color del spinner
  className?: string; // estilos adicionales (centrado, margen, etc.)
};

export default function LoadingSpinner({
  size = 16,
  color = "#ffffff",
  className = "",
}: SpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <HashLoader size={size} color={color} />
    </div>
  );
}
