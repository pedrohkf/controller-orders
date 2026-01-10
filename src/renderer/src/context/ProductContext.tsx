import React from 'react'
import Product from '@renderer/shared/types/product';

type ProductContextType = {
    products: Product[];
    createProduct: (name: string) => Promise<void>;
    editProduct : (productId: string, name:string) => Promise<void>;
}

const ProductContext = React.createContext<ProductContextType>(undefined);

export default ProductContext;
