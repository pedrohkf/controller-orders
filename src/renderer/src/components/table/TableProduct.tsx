import useProduct from "@renderer/hook/useProduct"

import styles from "./TableOrder.module.css"

const TableProduct = ({ onSelect, onSelectId }) => {
    const products = useProduct();

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.title}>
                        <th>Nome do Produto</th>
                    </tr>
                </thead>
                <tbody>
                    {products.products.map(product =>
                        <tr key={product.productId}>
                            <td onClick={() => {
                                onSelect(product),
                                onSelectId(product.productId)
                            }}>{product.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TableProduct
