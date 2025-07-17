'use client';

import { createContext, useContext, useState } from "react";

interface VariantContextType {
  flavor: string;
  setFlavor: (val: string) => void;
}

export const VariantContext = createContext<VariantContextType | undefined>(
  undefined
);

export const VariantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flavor, setFlavor] = useState<string>("ts-tailwind");
  return (
    <VariantContext.Provider value={{ flavor, setFlavor }}>
      {children}
    </VariantContext.Provider>
  );
};

export const useVariant = () => {
  const context = useContext(VariantContext);
  if (!context)
    throw new Error("useVariant must be used inside VariantProvider");
  return context;
};
