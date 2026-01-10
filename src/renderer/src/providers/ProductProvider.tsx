import ProductContext from '@renderer/context/ProductContext';
import { useEffect, useState } from 'react'

import Product from '@renderer/shared/types/product';

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([])

    const loadProducts = async () => {
        const products = await window.electron.ipcRenderer.invoke("product:list");
        setProducts(products)
    }

    const createProduct = async (name: string) => {
        await window.electron.ipcRenderer.invoke("product:create", {
            name,
        })

        setProducts(products)
        loadProducts()
    }

    const editProduct = async (productId: string, name: string) => {
        await window.electron.ipcRenderer.invoke("product:edit", {
            productId,
            name
        })

        loadProducts();
    }

    useEffect(() => {
        loadProducts();
    }, [])

    const value = { products, createProduct, editProduct };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider
