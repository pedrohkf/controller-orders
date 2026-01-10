import useProductContext from '@renderer/hook/useProduct';
import { useEffect, useState } from 'react';

import styles from "./FormProduct.module.css"

const FormProduct = ({ item, setItem, productId }) => {
    const [name, setName] = useState<string>(item ? item.name : "");

    const product = useProductContext();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (item) {
            product.editProduct(productId, name);
            setName("");
            setItem(null);
        } else {
            product.createProduct(name);
            setName("");
            setItem(null);
        }
    }

    useEffect(() => {
        if (item) {
            setName(item.name);
        } else {
            setName("");
            setItem(null);
        }
    }, [item]);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <h3>Cadastrar Produto</h3>
                <label htmlFor="produto">Nome do Produto<input type="text" placeholder="Nome produto" value={name} onChange={(e) => setName(e.target.value)} /></label>
            </div>
            <button>Enviar</button>
        </form>
    )
}

export default FormProduct
