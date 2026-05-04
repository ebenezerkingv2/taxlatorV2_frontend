// ===================================== 
// src/components/context/useTaxModal.ts
// ===================================== USE TAX MODAL COMPONENT
import { useContext } from "react";
import TaxModalContext from "./TaxModalContext";

// ===================================== FUNCTION
export function useTaxModal() {
	const ctx = useContext(TaxModalContext);
	if (!ctx) throw new Error("useTaxModal must be used within provider");
	return ctx;
}
