import ProductContext, { ProductContextType } from "@renderer/context/ProductContext";
import { useContext } from "react";

export default function useProductContext(): ProductContextType {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider")
    }

    return context;

}
