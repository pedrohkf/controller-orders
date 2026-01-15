import Trash from "@renderer/assets/icons/Trash";
import styles from "./ProductFieldset.module.css"
import useProductContext from "@renderer/hook/useProduct";


const ProductFieldset = ({ item, index, updateOrderItem, removeProduct }) => {
    const listProducts = useProductContext();

    const products = listProducts?.products || [];


    return (
        <fieldset className={styles.productItem}>
            <legend>Produto {index + 1}</legend>

            <div className={styles.rowProducts}>
                <label>
                    Produto
                    <select
                        value={item.productId || ""}
                        onChange={e => updateOrderItem(index, "productId", Number(e.target.value))}
                    >
                        <option value="">Selecione um produto</option>
                        {products.map(prod => (
                            <option key={prod.productId} value={prod.productId}>
                                {prod.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Quantidade
                    <input type="number" value={item.amount} onChange={e => updateOrderItem(index, "amount", Number(e.target.value))} />
                </label>

                <label>
                    Preço
                    <input type="number" value={item.finalPrice} onChange={e => updateOrderItem(index, "finalPrice", Number(e.target.value))} />
                </label>

                <button type="button" onClick={() => removeProduct(index)}><Trash /></button>
            </div>

            <div className={styles.rowDetails}>
                <label>Custo<input type="number" value={item.cost} onChange={e => updateOrderItem(index, "cost", Number(e.target.value))} /></label>
                <label>Customização<input type="number" value={item.customization} onChange={e => updateOrderItem(index, "customization", Number(e.target.value))} /></label>
                <label>Log<input type="number" value={item.log} onChange={e => updateOrderItem(index, "log", Number(e.target.value))} /></label>
                <label>Desconto<input type="number" value={item.discount} onChange={e => updateOrderItem(index, "discount", Number(e.target.value))} /></label>
            </div>
        </fieldset>
    )

};

export default ProductFieldset;