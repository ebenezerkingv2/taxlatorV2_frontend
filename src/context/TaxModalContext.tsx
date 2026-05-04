// =====================================
// src/components/context/TaxModalContext.tsx
// ===================================== TAX MODAL CONTEXT COMPONENT

import { createContext } from "react";

// ===================================== DATA
type TaxModalContextType = {
	openModal: () => void;
};

const TaxModalContext = createContext<TaxModalContextType | null>(null);

// ===================================== FUNCTION
export default TaxModalContext;
