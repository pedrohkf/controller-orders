import Trash from "@renderer/assets/icons/Trash";
import styles from "./ProductFieldset.module.css"
import useProductContext from "@renderer/hook/useProduct";

import type { InputNumberProps } from "antd";
import { InputNumber } from "antd";

const formatter: InputNumberProps<number>["formatter"] = (value) => {
    const [start, end] = `${value}`.split('.') || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `R$ ${end ? `${v}.${end}` : `${v}`}`;
}


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
                    <div>
                        <InputNumber<number>
                            defaultValue={item.finalPrice}
                            formatter={formatter}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "finalPrice", value)}
                        />
                    </div>
                </label>

                <button type="button" onClick={() => removeProduct(index)}><Trash /></button>
            </div>

            <div className={styles.rowDetails}>
                <label>
                    Custo
                    <div>
                        <InputNumber<number>
                            defaultValue={item.cost}
                            formatter={formatter}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "cost", value)} />
                    </div>
                </label>

                <label>Customização
                    <div>
                        <InputNumber<number>
                            defaultValue={item.customization}
                            formatter={formatter}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            onChange={(value)=> updateOrderItem(index, "customization", value)} />
                    </div>
                </label>

                <label>
                    Log
                    <div>
                        <InputNumber<number>
                            defaultValue={item.log}
                            formatter={formatter}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "log", value)} />
                    </div>
                </label>

                <label>
                    Desconto
                    <div>
                        <InputNumber<number>
                            defaultValue={item.log}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value?.replace('%', '') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "discount", value)} />

                    </div>
                </label>
            </div>
        </fieldset>
    )

};

export default ProductFieldset;