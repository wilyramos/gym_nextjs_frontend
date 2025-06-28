// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina múltiples clases condicionales y resuelve conflictos de Tailwind
 * Ejemplo: cn("p-2", isActive && "bg-red-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
